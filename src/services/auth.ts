import apiConfig from "../config/apiConfig";

// 학번은 15번으로 고정 -> 추후 변경 가능
const studentNumber = "15";

export const requestLogin = async (code: string, socialType: "KAKAO" | "GOOGLE") => {
  try {
    const response = await apiConfig.post("/auth/login", {
      code,
      socialType,
      studentNumber, 
    });

    if (response.status === 200) {
      return response.data.data; // accessToken, refreshToken 반환
    } else {
      throw new Error(`로그인 실패: ${response.data.message}`);
    }
  } catch (error: any) {
    console.error("로그인 요청 실패:", error.response?.data || error.message);
    throw new Error(error.response?.data?.message || "로그인 요청 실패");
  }
};
