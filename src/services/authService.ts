import apiConfig from "../config/apiConfig";
import Cookies from "js-cookie";


export const refreshAccessToken = async (accessToken: string) => {
  try {
    const refreshToken = Cookies.get("refreshToken"); 
    if (!refreshToken) {
      console.error("리프레시 토큰이 없습니다. 재로그인 필요");
      throw new Error("리프레시 토큰 없음");
    }

    const response = await apiConfig.post(`/api/auth/reissue`, {
      accessToken,
      refreshToken, 
    });

    return response.data; 
  } catch (error: any) {
    console.error("토큰 재발급 실패:", error.response?.data?.message || error.message);
    throw error;
  }
};
