import * as S from '../styles/StepStartStyled';
import AuthButton from './AuthButton';
import { useAuthStore } from '@/stores/useAuthStore';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepStart() {
  const { setStep } = useAuthStore();
  const { handleLogin } = useSocialLogin();
  const { isMobile } = useMediaQueries();

  return (
    <S.Container>
      <S.LogoWrapper>
        <S.LogoIcon $isMobile={isMobile} />
        <S.LogoText $isMobile={isMobile} />
      </S.LogoWrapper>

      <S.SubText $isMobile={isMobile}>
        Farm System 회원들을 위한 커뮤니티
      </S.SubText>

      <S.ButtonGroup $isMobile={isMobile}>
        <AuthButton provider="google" onClick={() => handleLogin('GOOGLE')} />
        <AuthButton provider="kakao" onClick={() => handleLogin('KAKAO')} />
      </S.ButtonGroup>

      <S.GapWrapper>
        <S.Text $isMobile={isMobile}>회원인증 후 서비스를 이용할 수 있어요!</S.Text>
        <S.LinkWrapper onClick={() => setStep('input')} $isMobile={isMobile}>
          회원 인증하기
        </S.LinkWrapper>
      </S.GapWrapper>
    </S.Container>
  );
}