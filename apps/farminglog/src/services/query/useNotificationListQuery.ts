// 알림을 받아오는 api

import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { Notification } from '@/models/notification';

export const useNotificationListQuery = () => {
  const { get } = usePrivateApi();

  return useQuery<Notification[]>({
    queryKey: ['notificationList'],
    queryFn: async () => {
      const response = await get('/notification');
      return response.data as Notification[];
    },
    staleTime: 0,
    retry: 1,
  });
};
