import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';

export interface Notification {
  notificationId: number;
  type: 'CHEER' | 'SEED' | 'ETC';
  title: string;
  message: string;
  targetUrl: string;
  isRead: boolean;
  createdAt: string;
}

export const useNotificationListQuery = () => {
  const { get } = usePrivateApi();

  return useQuery<Notification[]>({
    queryKey: ['notificationList'],
    queryFn: async () => {
      const res = await get('/notification');
      return res.data as Notification[];
    },
    staleTime: 0,
    retry: 1,
  });
};
