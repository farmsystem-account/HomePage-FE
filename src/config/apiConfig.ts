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

// 요청 인터셉터
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

// 응답 인터셉터: 401 발생 시 Reissue API 요청하여 토큰 갱신
apiConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; 

      try {
        const expiredAccessToken = localStorage.getItem("accessToken");
        const refreshToken = Cookies.get("refreshToken");
        
        if (!refreshToken || !expiredAccessToken) {
          console.error("❌ 리프레시 토큰 없음 → 재로그인 필요");
          localStorage.removeItem("accessToken");
          Cookies.remove("refreshToken");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // 헤더 없이 바디에만 만료된 액세스 토큰 전달
        const newTokens = await refreshAccessToken(expiredAccessToken);

        localStorage.setItem("accessToken", newTokens.accessToken);
        Cookies.set("refreshToken", newTokens.refreshToken, { secure: true, sameSite: "Strict" });

        originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        return apiConfig(originalRequest);
      } catch (refreshError) {
        console.error("❌ 토큰 갱신 실패 → 재로그인 필요");
        localStorage.removeItem("accessToken");
        Cookies.remove("refreshToken");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiConfig;
