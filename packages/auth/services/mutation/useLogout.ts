import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePrivateApi } from '../../../api/hooks/usePrivateApi';
import { useAuthStore } from '../../stores/useAuthStore';
// import { useUserStore } from '../../stores/userStore';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';

export const useLogout = () => {
  const { post } = usePrivateApi();
  // const clearUser = useUserStore((s) => s.clearUser);
  const queryClient = useQueryClient();
  const clearUser = () => {
    queryClient.removeQueries({queryKey: ['user', 'me'], exact: false});
    queryClient.removeQueries({queryKey: ['user', 'search', ''], exact: false});
    queryClient.removeQueries({queryKey: ['user', 'suggest', ''], exact: false});
    queryClient.removeQueries({queryKey: ['userInfo'], exact: false});
    queryClient.removeQueries({queryKey: ['auth', 'token'], exact: false});
    queryClient.removeQueries({queryKey: ['auth', 'verify', ''], exact: false});
  }
  const clearAuth = useAuthStore((s) => s.reset); 
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      return await post('/auth/logout');
    },
    onSuccess: () => {
      clearUser();
      clearAuth();

      localStorage.removeItem('auth-storage');

      Cookies.remove('refreshToken'); 

      // 로그인 페이지로 이동
      navigate('/');
    },
    onError: () => {
      // 에러 처리
      alert('로그아웃 중 오류가 발생했습니다. 다시 시도해주세요.');
    },
  });
};
