import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import Cookies from 'js-cookie';

import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLoginApi } from '@/services/api/socialLogin'; 

import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithSocial } = useSocialLoginApi(); 
  const { studentId, setToken } = useAuthStore((s) => s);

  useEffect(() => {
    const code = params.get('code');
    const provider = (params.get('state') || params.get('provider'))?.toUpperCase();

    if (!code || (provider !== 'KAKAO' && provider !== 'GOOGLE')) {
      navigate('/?error=invalid_params');
      return;
    }

    const login = async () => {
      try {
        const { accessToken, refreshToken } = await loginWithSocial({
          code,
          socialType: provider,
          studentNumber: studentId,
        });

        setToken(accessToken);
        Cookies.set('refreshToken', refreshToken, {
          secure: true,
          sameSite: 'Strict',
        });

        navigate('/home');
      } catch (err: any) {
        const status = err?.response?.status;
        switch (status) {
          case 404:
            navigate('/?error=not-found');
            break;
          case 409:
            navigate('/?error=conflict');
            break;
          case 500:
            navigate('/?error=server-error');
            break;
          default:
            navigate('/?error=unknown');
        }
      }
    };

    login();
  }, [params, navigate, loginWithSocial, setToken, studentId]);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
      }}
    >
      <LoadingSkeleton />
    </div>
  );
}
