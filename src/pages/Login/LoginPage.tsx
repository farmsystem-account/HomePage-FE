import { useEffect, useState } from "react";

// Kakao SDK 타입 정의
interface Kakao {
  init: (key: string) => void;
  isInitialized: () => boolean;
  Auth: {
    authorize: (options: { redirectUri: string }) => void;
  };
}

declare global {
  interface Window {
    Kakao: Kakao;
  }
}

// 카카오 SDK 초기화 hook
const kakaoInit = () : Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!window.Kakao) {
      reject("Kakao SDK not loaded");
      return;
    }
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY); 
    }
    resolve();
  });
};

// 등록된 Redirect URI 사용하여 카카오 로그인 처리
const handleKakaoLogin = () => {
  console.log("Redirect URI:", import.meta.env.VITE_KAKAO_REDIRECT_URI);

  window.Kakao.Auth.authorize({
    redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI, 
  });
};

// 로그인 페이지 컴포넌트
const LoginPage = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    kakaoInit()
      .then(() => {
        setIsKakaoInitialized(true);
      })
      .catch((error) => {
        console.error("Kakao SDK initialization failed:", error);
      });
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      setAuthCode(code);
    }
  }, []);

  return (
    <div>
      <h1>Login Page</h1>
      {isKakaoInitialized ? (
        <>
          <button onClick={handleKakaoLogin}>Login with Kakao</button>
          {authCode && <p>Authorization Code: {authCode}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default LoginPage;