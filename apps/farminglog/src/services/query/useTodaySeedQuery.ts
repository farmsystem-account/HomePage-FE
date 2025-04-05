import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi'; // 인증 포함 API
import { queryKeys } from '../queryKeys';
import { isHarvest } from '@/models/checkHarvest';

export const useTodaySeedQuery = () => {
  const { get } = usePrivateApi();

  return useQuery({
    queryKey: queryKeys.user.todaySeed, // queryKeys 사용
    queryFn: async () => {
      const { data, status } = await get('/user/today-seed');
      if (status !== 200) throw new Error('오늘의 씨앗 현황 조회 실패');
      return data as isHarvest;
    },
    staleTime: 0, 
    refetchOnMount: true, // 강제로 다시 가져
    retry: false, // 404 등 에러 시 재시도 X
  });
};
