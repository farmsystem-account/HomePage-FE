import { useQuery } from "@tanstack/react-query";
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { queryKeys } from "../queryKeys";

export const useUserSuggestQuery = (query: string) => {
  const { get } = usePrivateApi();

  return useQuery({
    queryKey: queryKeys.user.suggest(query),
    queryFn: async () => {
      const { data, status } = await get("/user/suggest", { query });
      if (status !== 200) throw new Error("추천 사용자 조회 실패");
      return data;
    },
    enabled: !!query,
  });
};
