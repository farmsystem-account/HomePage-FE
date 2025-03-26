// src/pages/auth/SocialRedirect.tsx
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useSocialLoginPostMutation } from '@repo/auth/services/mutation/useSocialLoginPostMutation';

export default function SocialRedirect() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const mutation = useSocialLoginPostMutation();

  useEffect(() => {
    const code = searchParams.get('code');
    const socialType = searchParams.get('state'); // 'KAKAO' or 'GOOGLE'

    if (!code || !socialType) {
      console.error('소셜 로그인 파라미터 누락');
      navigate('/?error=invalid_params');
      return;
    }

    mutation.mutate(
      {
        code,
        socialType: socialType.toUpperCase() as 'KAKAO' | 'GOOGLE',
      },
      {
        onSuccess: () => {
          navigate('/home');
        },
        onError: (err) => {
          console.error('소셜 로그인 실패:', err);
          navigate('/?error=auth');
        },
      }
    );
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '4rem' }}>
      <h2>소셜 로그인 처리 중입니다...</h2>
    </div>
  );
}
