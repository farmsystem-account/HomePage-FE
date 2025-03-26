import * as S from '../styles/StepNotMember.styled'; // 기존 스타일 재사용
import { useAuthStore } from '@/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepNotMember() {
  const { setStep } = useAuthStore();
  const { isMobile } = useMediaQueries();

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>Farm System <br />회원이 아닙니다.</S.Title>
      <S.SubTitle $isMobile={isMobile}>
        해당 학번으로 등록된 회원이 없습니다. <br />
        운영진에게 문의해주세요.
      </S.SubTitle>
      <S.Button $isMobile={isMobile} onClick={() => setStep('input')}>
        다시 시도하기
      </S.Button>
    </S.Container>
  );
}
