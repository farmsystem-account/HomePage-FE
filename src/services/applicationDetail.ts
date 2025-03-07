import apiConfig from "../config/apiConfig";
import { Application } from "../types/application";

export const fetchApplicationDetail = async (applyId: string): Promise<Application> => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await apiConfig.get<Application>(`/admin/apply/${applyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });
      console.log(response.data);
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "지원서 상세 조회 실패");
  }
};