import { useMutation } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { FarmingLogCategory } from '@/models/farminglog';

type FarmingLogPayload = {
  title: string;
  content: string;
  category: FarmingLogCategory;
};

export const useCreateFarmingLogMutation = () => {
  const { post } = usePrivateApi();

  return useMutation({
    mutationFn: async (payload: FarmingLogPayload) => {
      return await post('/farming-logs', payload);
    },
    onSuccess: () => {
      console.log('글 작성 성공!');
    },
    onError: (error) => {
      console.error('글 작성 실패:', error);
    },
  });
};
