import * as S from '../styles/StepInputStudentId.styled'; // 기존 스타일 재사용 나중에 공통으로 뺄 필요 있음
import useMediaQueries from '@/hooks/useMediaQueries';
import AuthButton from './AuthButton';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';


export default function StepAuthComplete() {
    const { isMobile } = useMediaQueries();
      const { handleLogin } = useSocialLogin();
    

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>인증이 완료되었습니다</S.Title>
      <S.SubTitle $isMobile={isMobile}>
        이어서 진행해주세요!
          </S.SubTitle>
          <AuthButton provider="google" onClick={() => handleLogin('GOOGLE')} />
          <AuthButton provider="kakao" onClick={() => handleLogin('KAKAO')} />
    </S.Container>
  );
}
