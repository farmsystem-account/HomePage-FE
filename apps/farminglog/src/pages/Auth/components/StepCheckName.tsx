import * as S from '../styles/StepCheckName.styled';
import { useAuthStore } from '@/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepCheckName() {
  const { userName, setStep } = useAuthStore();
  const { isMobile } = useMediaQueries();

  const handleConfirm = () => {
    // 예: 백엔드 인증 처리 후
    setStep('complete');
  };

  const handleBack = () => {
    setStep('input');
  };

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>Farm System 회원 인증</S.Title>
      <S.SubTitle $isMobile={isMobile}>
        {userName} 님이 맞으신가요?
          </S.SubTitle>
          <S.ButtonGroup $isMobile={isMobile}>
  <S.ConfirmButton
    $isMobile={isMobile}
    onClick={handleConfirm}
    style={{
      backgroundColor: '#29D4A7',
      width: isMobile ? '80px' : '140px',
    }}
  >
    확인
  </S.ConfirmButton>

  <S.CancelButton
    $isMobile={isMobile}
    onClick={handleBack}
    style={{
      backgroundColor: '#999999',
      color: '#fcfcfc',
      width: isMobile ? '80px' : '140px',
    }}
  >
    돌아가기
  </S.CancelButton>
</S.ButtonGroup>
    </S.Container>
  );
}
