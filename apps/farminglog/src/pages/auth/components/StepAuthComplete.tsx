import * as S from '../styles/StepAuthComplete.Stlyed.ts'; 
import useMediaQueries from '@/hooks/useMediaQueries';
import AuthButton from './AuthButton';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';


export default function StepAuthComplete() {
    const { isMobile } = useMediaQueries();
      const { handleLogin } = useSocialLogin();
    

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>인증이 완료되었습니다!</S.Title>
      <S.SubTitle $isMobile={isMobile}>
      이어서 진행해주세요.
      </S.SubTitle>
      <S.ButtonContainer $isMobile={isMobile}>
      <AuthButton provider="google" onClick={() => handleLogin('GOOGLE')} />
      <AuthButton provider="kakao" onClick={() => handleLogin('KAKAO')} />
      </S.ButtonContainer>
    </S.Container>
  );
}
