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

  const { mutateAsync: socialLogin } = useSocialLoginPostMutation();

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
          setErrorTitle(
            <>
              가입되지 않은 <br /> 사용자입니다.
            </>
          );
          setErrorMessage(
            <>
              회원 인증 후 로그인해주세요. <br />
              문제가 있다면, 운영진에게 문의해주세요.
            </>
          );
          setButtonLabel("처음으로");
          navigate('/?status=not-member');
        } else if (status === 409) {
          setErrorTitle(
            <>
              이미 다른 소셜 계정으로 <br /> 가입된 사용자입니다.
            </>
          );
          setErrorMessage(
            <>
              다른 계정으로 로그인해주세요. <br />
              계정을 잊으셨다면 운영진에게 문의해주세요.
            </>
          );
          setButtonLabel("처음으로");
          navigate('/?status=not-member&type=409');
         } else if (status === 500) {
          setErrorTitle(
            <>
              서버에 문제가 발생했어요.
            </>
          );
          setErrorMessage(
            <>
              잠시 후 다시 시도해주세요. <br />
              문제가 지속되면 운영진에게 알려주세요.
            </>
          );
          setButtonLabel("처음으로");
          navigate('/?status=not-member&type=server');
        } else {
          setErrorTitle(
            <>
              로그인 중 오류가 발생했어요.
            </>
          );
          setErrorMessage(
            <>
              잠시 후 다시 시도해주세요. <br />
              계속 실패하면 운영진에게 문의해주세요.
            </>
          );
          setButtonLabel("처음으로");
          navigate('/?status=not-member&type=unknown');
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
