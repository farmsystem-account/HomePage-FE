import * as S from '../styles/StepCheckName.styled';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepCheckName() {
  const { userName, setStep,setErrorMessage } = useAuthStore();
  const { isMobile } = useMediaQueries();

  const handleConfirm = () => {
    setStep('complete');
  };

  const handleBack = () => {
    setErrorMessage('입력한 정보를 확인해주세요.');
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
