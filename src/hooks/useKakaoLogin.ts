import { useEffect, useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authStore";

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

// 환경별 리다이렉트 URI 가져오기
const getRedirectUri = () => {
  return import.meta.env.MODE === "development"
    ? "http://localhost:5173/api/auth/login"  // 로컬 환경에서는 localhost 사용
    : import.meta.env.VITE_KAKAO_REDIRECT_URI; // 배포 환경에서는 .env 값 사용
};


// 환경 감지 (웹 vs 카카오 앱)
const isKakaoApp = () => {
  const ua = navigator.userAgent.toLowerCase();
  return ua.includes("kakaotalk");
};

// 카카오 SDK 초기화
const kakaoInit = async (): Promise<void> => {
  if (!window.Kakao) throw new Error("Kakao SDK not loaded");
  if (!window.Kakao.isInitialized()) {
    const appKey = import.meta.env.VITE_KAKAO_JS_KEY;
    if (!appKey) throw new Error("Kakao.init: App key must be provided");
    window.Kakao.init(appKey);
  }
};

// 로그인 방식 결정 (웹: REST API, 앱: SDK)
const handleKakaoLogin = () => {
  const redirectUri = getRedirectUri();
  const clientId = import.meta.env.VITE_KAKAO_CLIENT_ID; // ✅ 환경변수에서 가져오기

  if (!clientId) {
    console.error("Kakao Client ID가 설정되지 않았습니다.");
    return;
  }

  if (isKakaoApp()) {
    // 앱 환경에서는 SDK 활용
    if (!window.Kakao) return;
    window.Kakao.Auth.authorize({ redirectUri });
  } else {
    // 웹 환경에서는 REST API 방식 사용
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }
};


// 인가 코드 처리 및 백엔드로 전송 (useNavigate 사용 X)
const handleAuthorizationCode = async (code: string) => {
  const studentNumber = useAuthStore.getState().studentNumber;  // ✅ Zustand 스토어에서 값 가져오기

  try {
    console.log("인가 코드:", code);

    // 백엔드로 인가 코드 전송
    const response = await axios.post("https://api.dev.farmsystem.kr/api/auth/login", {
      code,
      studentNumber,
    });

    console.log("백엔드 응답:", response.data);

    // JWT 저장 (LocalStorage)
    localStorage.setItem("accessToken", response.data.accessToken);
    localStorage.setItem("refreshToken", response.data.refreshToken);

  } catch (error) {
    console.error("카카오 로그인 처리 실패:", error);
  }
};

export const useKakaoLogin = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);

  useEffect(() => {
    kakaoInit()
      .then(() => setIsKakaoInitialized(true))
      .catch((error) => console.error("Kakao SDK initialization failed:", error));
  }, []);

  return { isKakaoInitialized, handleKakaoLogin, handleAuthorizationCode };
};
