import * as S from '../styles/StepNotMember.styled';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepNotMember() {
  const { setStep, errorTitle, errorMessage } = useAuthStore();
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
        {errorMessage ? (
          <span
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          />
        ) : (
          <>
            회원인증 후<br />
            다시 시도 해주세요.
          </>
        )}
      </S.SubTitle>

      <S.Button $isMobile={isMobile} onClick={() => setStep('input')}>
        회원인증 하기
      </S.Button>
    </S.Container>
  );
}
