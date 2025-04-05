import * as S from '../styles/StepStartStyled';
import AuthButton from './AuthButton';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import useMediaQueries from '@/hooks/useMediaQueries';
import signIn from '@/assets/Icons/signIn.png';

import { isKakaoInApp, isAndroid, isIOS } from '@/utils/detect'; // utils로 분리해둔 브라우저 감지 함수

export default function StepStart() {
  const { setStep } = useAuthStore();
  const { handleLogin } = useSocialLogin();
  const { isMobile } = useMediaQueries();

  const redirectIfInApp = (provider: 'KAKAO' | 'GOOGLE') => {
    const loginUrl = `${window.location.origin}/login?type=${provider}`; // 외부 브라우저에서 다시 로그인 처리

    if (isKakaoInApp()) {
      if (isAndroid()) {
        window.location.href = `intent://login?type=${provider}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
          loginUrl
        )};end;`;
      } else if (isIOS()) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(loginUrl)}`;
      }
      return true; // 외부 브라우저로 이동하므로 로그인 로직은 중단
    }
    return false; // 인앱이 아니면 그대로 로그인 진행
  };

  const handleClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (!redirectIfInApp(provider)) {
      handleLogin(provider);
    }
  };

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
        <AuthButton provider="google" onClick={() => handleClick('GOOGLE')} />
        <AuthButton provider="kakao" onClick={() => handleClick('KAKAO')} />
      </S.ButtonGroup>

      <S.GapWrapper>
        <S.Text $isMobile={isMobile}>회원인증 후 서비스를 이용할 수 있어요!</S.Text>
        <S.LinkWrapper onClick={() => setStep('input')} $isMobile={isMobile}>
          회원 인증하기
          <img
            src={signIn}
            alt="signIn icon"
            style={{ width: isMobile ? '6.5px' : '9px', height: 'auto' }}
          />
        </S.LinkWrapper>
      </S.GapWrapper>
    </S.Container>
  );
}
