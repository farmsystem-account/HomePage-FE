import axios from "axios";
import Cookies from "js-cookie";
import { refreshAccessToken } from "../services/authService";

const getApiBaseUrl = () => {
  const baseUrl = import.meta.env.VITE_BASE_URL; 
  return baseUrl.endsWith("/") ? `${baseUrl}api/` : `${baseUrl}/api/`;
};

const API_BASE_URL = getApiBaseUrl();

const apiConfig = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, 
});

// 요청 인터셉터: 모든 요청에 자동으로 엑세스 토큰 추가
apiConfig.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 401 발생 시 자동으로 토큰 재발급 후 요청 재시도
apiConfig.interceptors.response.use(
  (response) => response, 
  async (error) => {
    const originalRequest = error.config;

    // 401 Unauthorized 발생 시, 자동으로 토큰 재발급
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const refreshToken = Cookies.get("refreshToken"); // 쿠키에서 리프레시 토큰 가져오기
        if (!refreshToken) {
          console.error("리프레시 토큰 없음 → 재로그인 필요");
          localStorage.removeItem("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login"; // 로그인 페이지로 이동
          return Promise.reject(error);
        }

        // ✅ 엑세스 토큰 재발급 요청
        const newTokens = await refreshAccessToken(localStorage.getItem("accessToken")!);
        localStorage.setItem("accessToken", newTokens.accessToken);
        Cookies.set("refreshToken", newTokens.refreshToken, { secure: true, sameSite: "Strict" });

        // ✅ 새로운 토큰으로 원래 요청 다시 실행
        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return apiConfig(originalRequest);
      } catch (refreshError) {
        console.error("토큰 갱신 실패 → 재로그인 필요");
        localStorage.removeItem("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login"; // 로그인 페이지로 이동
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiConfig; // ✅ 모든 API 요청에서 사용 가능!
