import * as S from '../styles/StepNotMember.styled';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepNotMember() {
  const { setStep, errorTitle, setErrorMessage} = useAuthStore();
  const { isMobile } = useMediaQueries();


  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />

      <S.Title $isMobile={isMobile}>
        {errorTitle
          ? errorTitle
          : <>Farm System <br />회원이 아닙니다</>
        }
      </S.Title>

      <S.SubTitle $isMobile={isMobile}>
        학번이 맞는지 다시 한 번 확인해 주세요.<br />인증이 계속 안 된다면 운영진에게 알려주세요!
      </S.SubTitle>

      <S.Button $isMobile={isMobile} onClick={() => { setStep('input'); setErrorMessage("정확한 학번을 입력해주세요."); }}>
        회원인증 하기
      </S.Button>
    </S.Container>
  );
}
