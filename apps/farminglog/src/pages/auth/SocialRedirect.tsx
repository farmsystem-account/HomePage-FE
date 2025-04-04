import { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLoginPostMutation } from '@repo/auth/services/mutation/useSocialLoginPostMutation';
import { useErrorStore } from '@/stores/useErrorStore';
import LoadingSkeleton from '@/components/Skeleton/LoadingSkeleton';

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { studentId } = useAuthStore();
  const hasCalled = useRef(false);
  const { setErrorMessage, setErrorTitle, setButtonLabel } = useErrorStore();

  const { mutateAsync: socialLogin } = useSocialLoginPostMutation(); // ✅ mutateAsync로 변경

  useEffect(() => {
    if (hasCalled.current) return;
    hasCalled.current = true;

    const code = params.get('code');
    const provider = (params.get('state') || params.get('provider'))?.toUpperCase();

    if (!code || (provider !== 'KAKAO' && provider !== 'GOOGLE')) {
      navigate('/?error=invalid_params');
      return;
    }

    const login = async () => {
      try {
        await socialLogin({ code, socialType: provider });
        navigate('/home');
      } catch (error: any) {
        const status = error?.status;

        if (status === 404) {
          setErrorTitle("가입되지 않은 사용자입니다.");
          setErrorMessage("소속 정보를 확인하고 다시 시도해주세요.");
          setButtonLabel("처음으로");
          navigate('/?status=not-member');
        } else if (status === 409) {
          setErrorTitle("이미 다른 소셜 계정으로 가입된 사용자입니다.");
          setErrorMessage("다른 계정으로 로그인해주세요.");
          setButtonLabel("처음으로");
          navigate('/?status=not-member&type=409');
        } else if (status === 500) {
          alert("로그인 중 문제가 발생했습니다.\n다시 로그인 해주세요.");
          navigate('/');
        } else {
          alert("계속 안되면 운영진에게 문의해주세요!");
          navigate('/');
        }
      }
    };

    login();
  }, [params, navigate, socialLogin, setErrorMessage, setErrorTitle, setButtonLabel, studentId]);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100%',
    }}>
      <LoadingSkeleton />
    </div>
  );
}
