// 파밍로그 게시글 무한스크롤 쿼리
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { queryKeys } from "../queryKeys";
import { FarmingLogsResponse } from '@/models/farminglog';

export const useFarmingLogsInfiniteQuery = () => {
  const { get } = usePrivateApi();
  const size = 10; // 한 페이지 당 불러올 게시글 수

  return useInfiniteQuery<FarmingLogsResponse, Error>({
    queryKey: queryKeys.farminglog,
    queryFn: async ({ pageParam = 0 }): Promise<FarmingLogsResponse> => {
      const { data, status } = await get<FarmingLogsResponse>(
        `/farming-logs?page=${pageParam}&size=${size}&sort=%5B%22string%22%5D`
      );
      if (status !== 200) {
        throw new Error("파밍로그 조회 실패");
      }
      return data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
     return lastPage.number < lastPage.totalPages ? lastPage.number + 1 : undefined;
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};