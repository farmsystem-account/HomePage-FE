import { useMutation } from '@tanstack/react-query';
import { usePublicApi } from '../../hooks/usePublicApi';

interface UserVerifyRequest {
  studentNumber: string;
}

interface UserVerifyResponse {
  isVerified: boolean;
  studentNumber: string;
  name: string;
}

export const useUserVerifyMutation = () => {
  const { post } = usePublicApi();

  return useMutation<UserVerifyResponse, Error, UserVerifyRequest>({
    mutationFn: async (body) => {
      const { data, status } = await post<UserVerifyResponse>('/api/user/verify', body);

      if (status !== 200) {
        throw new Error('회원 인증에 실패했습니다.');
      }

      return data;
    },
  });
};
