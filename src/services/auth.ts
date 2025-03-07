import apiConfig from "../config/apiConfig";
import { useAuthStore } from "../store/authStore";
import Cookies from "js-cookie";

export const requestLogin = async (code: string, socialType: "KAKAO" | "GOOGLE") => {
  try {
    const studentNumber = useAuthStore.getState().studentNumber; 

    const response = await apiConfig.post("/auth/login", {
      code,
      socialType,
      studentNumber,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken } = response.data.data;

      useAuthStore.getState().setToken(accessToken);
      localStorage.setItem("accessToken", accessToken);

      Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "Strict" });

      // console.log("로그인 성공:", response.data.message);
      // console.log("액세스 토큰:", accessToken);
      // console.log("리프레시 토큰:", refreshToken);

      return { accessToken, refreshToken };
    } else {
      throw new Error(`로그인 실패: ${response.data.message}`);
    }
  } catch (error: any) {
    console.error("로그인 요청 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "로그인 요청 실패");
  }
};
