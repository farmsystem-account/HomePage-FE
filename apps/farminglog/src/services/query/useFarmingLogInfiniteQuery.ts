// 파밍로그 게시글 무한스크롤 쿼리
import { useInfiniteQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { queryKeys } from "../queryKeys";
import { FarmingLogsResponse } from '@/models/farminglog';

export const useFarmingLogsInfiniteQuery = () => {
  const { getData  } = usePrivateApi();
  const size = 10; // 한 페이지 당 불러올 게시글 수

  return useInfiniteQuery<FarmingLogsResponse, Error>({
    queryKey: queryKeys.farminglog,
    queryFn: async ({ pageParam = 0 }): Promise<FarmingLogsResponse> => {
      const response = await getData<FarmingLogsResponse>(
        `/farming-logs?page=${pageParam}&size=${size}`
      );
      if (!response) {
        console.error("파밍로그 조회 실패");
        throw new Error("파밍로그 조회 실패");
      }
      console.log(response)
      return (response as FarmingLogsResponse);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.last ? undefined : lastPage.number + 1,
    staleTime: 1000 * 60 * 5, // 5분
  });

};