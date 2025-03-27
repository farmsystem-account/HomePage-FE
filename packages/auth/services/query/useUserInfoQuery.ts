import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { useUserStore, UserInfo } from '../../stores/userStore';
import { ApiResponse } from '@repo/api/models/api'; 

export const useUserInfoQuery = () => {
  const { get } = usePrivateApi();
  const setUser = useUserStore((s) => s.setUser);

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res: ApiResponse<UserInfo> = await get('/api/user/mypage');
      setUser(res.data); 
      return res.data;
    },
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
