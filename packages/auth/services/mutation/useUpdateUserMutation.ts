import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { useUserStore, UserInfo } from '../../stores/userStore';
import { ApiResponse } from '@repo/api/models/api';

interface UpdateUserPayload {
  profileImageUrl?: string;
  phoneNumber?: string;
  notionAccount?: string;
  githubAccount?: string;
}

export const useUpdateUserMutation = () => {
  const { patch } = usePrivateApi();
  const queryClient = useQueryClient();
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async (payload: UpdateUserPayload) => {
      const res = await patch<ApiResponse<UserInfo>>('/api/user/mypage', payload);
      return res.data; 
    },
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['userInfo'], updatedUser);
      setUser(updatedUser.data); 
    },
  });
};
