import { useQuery } from "@tanstack/react-query";
import { usePrivateApi } from "@repo/api/hooks/usePrivateApi";

export interface UserInfo {
  userId: number;
  name: string;
  generation: number;
  track: string;
  profileImageUrl: string;
}

export interface SuggestResponse {
  status: number;
  message: string;
  data: UserInfo[];
}

export const useUserSuggestQuery = (query: string) => {
  const { get } = usePrivateApi();

  return useQuery<SuggestResponse>({
    queryKey: ["user-suggest", query],
    queryFn: async (): Promise<SuggestResponse> => {
      const { data, status } = await get<SuggestResponse>("/user/suggest", { query });
      if (status !== 200) throw new Error("추천 실패");
      return data;
    },
    enabled: Boolean(query),
  });
};
