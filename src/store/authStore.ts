import { create } from 'zustand';
import axios from "../config/apiConfig";

interface AuthState {
  studentNumber: string;
  studentName: string;
  setStudentInfo: (studentNumber: string, studentName: string) => void;
}

interface SocialLoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const useAuthStore = create<AuthState>((set) => ({
  studentNumber: '',
  studentName: '',
  setStudentInfo: (studentNumber, studentName) => set({ studentNumber, studentName }),
}));

export const socialLogin = async (code: string, provider: string, studentNumber: string): Promise<SocialLoginResponse> => {
  try {
    const response = await axios.post<SocialLoginResponse>("/auth/social-login", {
      code,
      provider,
      studentNumber,
    });
    return response.data;
  } catch (error) {
    console.error("소셜 로그인 실패:", error);
    throw error;
  }
};