//  출석 버튼 클릭 시 1일 1회 출석 및 씨앗 적립 API

import { useMutation } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { useUserStore } from '@repo/auth/stores/userStore';

export const useAttendMutation = () => {
  const { post } = usePrivateApi();
  const user = useUserStore((s) => s.user);
  const setUser = useUserStore((s) => s.setUser);

  return useMutation({
    mutationFn: async () => {
      await post('user/attendance'); // 응답 없음 200 ok 임
    },
    onSuccess: () => {
      if (user) {
        setUser({
          ...user,
          currentSeed: user.currentSeed + 1,// 갯수 몇 개 증가 시키기로 했지... 일단 1개 씩...
          totalSeed: user.totalSeed + 1,
        });
      }
    },
  });
};
