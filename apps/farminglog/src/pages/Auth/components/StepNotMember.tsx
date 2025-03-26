import * as S from '../styles/StepNotMember.styled'; // 기존 스타일 재사용
import { useAuthStore } from '@/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepNotMember() {
  const { setStep, errorMessage } = useAuthStore();
  const { isMobile } = useMediaQueries();

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>Farm System <br />회원이 아닙니다.</S.Title>
      <S.SubTitle $isMobile={isMobile}>
        {errorMessage}
      </S.SubTitle>
      <S.Button $isMobile={isMobile} onClick={() => setStep('input')}>
        다시 시도하기
      </S.Button>
    </S.Container>
  );
}
