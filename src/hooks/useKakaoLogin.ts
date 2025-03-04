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

// 카카오 SDK 초기화
const kakaoInit = async (): Promise<void> => {
  if (!window.Kakao) throw new Error("Kakao SDK not loaded");
  if (!window.Kakao.isInitialized()) {
    window.Kakao.init(import.meta.env.VITE_KAKAO_JS_KEY);
  }
};

// Redirect URI 설정 함수
const getRedirectUri = (): string => {
  return import.meta.env.VITE_KAKAO_REDIRECT_URI;
};

// 로그인 방식 결정 (웹: REST API, 앱: SDK)
const handleKakaoLogin = () => {
  const isMobileApp = /KAKAO/i.test(navigator.userAgent); // 앱 내 웹뷰 감지
  // const isMobileBrowser = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  const redirectUri = getRedirectUri();

  if (isMobileApp) {
    // 앱 환경에서는 SDK 활용
    if (!window.Kakao) return;
    window.Kakao.Auth.authorize({ redirectUri });
  } else {
    // 웹 환경에서는 REST API 방식 사용
    const clientId = import.meta.env.VITE_KAKAO_REST_API_KEY;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
  }
};

export const useKakaoLogin = () => {
  const [isKakaoInitialized, setIsKakaoInitialized] = useState(false);
  const [authCode, setAuthCode] = useState<string | null>(null);

  useEffect(() => {
    kakaoInit()
      .then(() => setIsKakaoInitialized(true))
      .catch((error) => console.error("Kakao SDK initialization failed:", error));
  }, []);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    if (code) setAuthCode(code);
  }, []);

  return { isKakaoInitialized, authCode, handleKakaoLogin };
};
