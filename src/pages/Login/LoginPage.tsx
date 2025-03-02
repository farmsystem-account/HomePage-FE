import { useEffect, useState } from "react";

interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    login: () => void;
  };
}

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

const kakaoInit = () : Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao) {
      reject("Kakao SDK not loaded");
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_REST_API_KEY); 
    }
    resolve();
  });
};

const LoginPage = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    kakaoInit()
      .then(() => {
        setIsKakaoInitialized(true);
      })
      .catch((error) => {
        console.error("Kakao SDK initialization failed:", error);
      });
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      {isKakaoInitialized ? (
        <button onClick={() => window.Kakao.Auth.login()}>Login with Kakao</button>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LoginPage;