// 다른 사용자 정보 조회 API

import { useQuery } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import type { PublicUserInfo } from '../../models/userPublic';
import { ApiResponse } from '@repo/api/models/api'; 

export const usePublicUserInfoQuery = (userId: number) => {
  const { get } = usePrivateApi();

  return useQuery({
    queryKey: ['publicUserInfo', userId],
    queryFn: async () => {
      const res = await get<ApiResponse<PublicUserInfo>>(`user/${userId}`);
      return res.data;
    },
    enabled: !!userId, // userId가 존재할 때만 fetch
    retry: 1,
  });
};
