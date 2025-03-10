import apiConfig from "../config/apiConfig";
import { Application } from "../types/application"; 

interface ApiResponse<T> {
  status: number;
  message: string;
  data: T;
}

export const fetchApplications = async (track?: string): Promise<Application[]> => {
  try {
    const response = await apiConfig.get<ApiResponse<Application[]>>("/admin/apply", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        Accept: "application/json",
      },
      params: track ? { track } : {},
    });

    return response.data.data; 
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "지원서 목록 조회 실패");
  }
};
