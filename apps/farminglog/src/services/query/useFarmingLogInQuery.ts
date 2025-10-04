// 파밍로그 게시글 페이지네이션 쿼리
import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { queryKeys } from "../queryKeys";
import { FarmingLogsResponse } from '@/models/farminglog';

export const useFarmingLogQuery = (page: number, size: number) => {
  const { getData } = usePrivateApi();

  return useQuery<FarmingLogsResponse, Error>({
    queryKey: [...queryKeys.farminglog, page, size], // 페이지별 캐싱
    queryFn: async (): Promise<FarmingLogsResponse> => {
      const response = await getData<FarmingLogsResponse>(
        `/farming-logs?page=${page}&size=${size}`
      );
      if (!response) {
        console.error("파밍로그 조회 실패");
        throw new Error("파밍로그 조회 실패");
      }
      console.log("파밍로그 조회 성공");
      return (response as FarmingLogsResponse);
    },
    staleTime: 1000 * 60 * 5, // 5분
  });
};