import { useMutation } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';

// 좋아요 토글 API
export const useToggleLikeMutation = () => {
  const { post } = usePrivateApi();

  return useMutation({
    mutationFn: async (farmingLogId: number) => {
      await post(`/farming-logs/${farmingLogId}/like`);
    },
    onSuccess: () => {
      console.log('좋아요 토글 성공!');
    },
    onError: (error) => {
      console.error('좋아요 토글 실패:', error);
    },
  });
};
