import { useEffect } from 'react';
import { useSearchParams } from 'react-router'; 
import * as S from '../styles/StepNotMember.styled';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useErrorStore } from '@/stores/useErrorStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepNotMember() {
  const [params] = useSearchParams(); 
  const { setStep } = useAuthStore();
  const { errorTitle, errorMessage, resetError, buttonLabel } = useErrorStore();
  const { isMobile } = useMediaQueries();

  useEffect(() => {
    if (params.get('status') === 'not-member') {
      setStep('start'); 
    }
  }, [params, setStep]);

  const handleClick = () => {
    resetError();
    setStep('input');
  };

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />

      <S.Title $isMobile={isMobile}>
        {errorTitle
          ? errorTitle
          : <>Farm System <br />회원이 아닙니다</>}
      </S.Title>

      <S.SubTitle $isMobile={isMobile}>
        {errorMessage
          ? errorMessage
          : <>학번이 맞는지 다시 한 번 확인해 주세요.<br />인증이 계속 안 된다면 운영진에게 알려주세요!</>}
      </S.SubTitle>

      <S.Button $isMobile={isMobile} onClick={handleClick}>
        {buttonLabel || '회원인증 하기'}
      </S.Button>
    </S.Container>
  );
}
