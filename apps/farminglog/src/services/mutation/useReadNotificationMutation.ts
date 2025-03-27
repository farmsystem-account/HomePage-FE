//알림 읽음 표시 api

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';

export const useReadNotificationMutation = () => {
  const { patch } = usePrivateApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (notificationId: number) => {
      return await patch(`/notification/${notificationId}/read`);
    },
    onSuccess: () => {
      // 읽음 처리 후 목록 다시 불러오기
      queryClient.invalidateQueries({ queryKey: ['notificationList'] });
    },
  });
};
