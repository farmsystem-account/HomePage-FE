// 마이페이지 사용자 정보 조회 api
// 주스탄드를 들어내보겠습니다.

import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '../../../api/hooks/usePrivateApi';
import { UserInfo } from '../../stores/userStore';
import { ApiResponse } from '../../../api/models/api'; 

export const useUserInfoQuery = (enabled: boolean = true) => {
  const { get } = usePrivateApi();
  // const setUser = useUserStore((s) => s.setUser);

  return useQuery({
    queryKey: ['userInfo'],
    queryFn: async () => {
      const res: ApiResponse<UserInfo> = await get('user/mypage');
      // setUser(res.data); 
      return res.data;
    },
    staleTime: 1000 * 60 * 5, // 5분 캐시
    gcTime: 1000 * 60 * 60, //1시간 캐시는 유지 -> 얼마가 적당한지 나중에 알아봐야함
    retry: 1,
    enabled, 
  });
};
