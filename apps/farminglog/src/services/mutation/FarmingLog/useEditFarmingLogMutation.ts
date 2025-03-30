import { useMutation } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { FarmingLogCategory } from '@/models/farminglog';

type FarmingLogPayload = {
  farminglogId: number;
  title: string;
  content: string;
  category: FarmingLogCategory;
};

export const useEditFarmingLogMutation = () => {
  const { patch } = usePrivateApi();

  return useMutation({
    mutationFn: async (payload: FarmingLogPayload) => {
      const { farminglogId, ...data } = payload;
      return await patch(`/farming-logs/${farminglogId}`, data);
    },
    onSuccess: () => {
      console.log('글 작성 성공!');
    },
    onError: (error) => {
      console.error('글 작성 실패:', error);
    },
  });
};
