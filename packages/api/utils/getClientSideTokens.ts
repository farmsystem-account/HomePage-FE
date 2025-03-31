import Cookies from "js-cookie";
import { useAuthStore } from "../../auth/stores/useAuthStore"; 

export const getClientSideTokens = () => {
  const accessToken = useAuthStore.getState().accessToken; 
  const refreshToken = Cookies.get("refreshToken") || "";

  return {
    accessToken: accessToken || "",
    refreshToken,
  };
};
