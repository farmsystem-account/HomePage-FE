import * as S from '../styles/StepStartStyled';
import AuthButton from './AuthButton';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import useMediaQueries from '@/hooks/useMediaQueries';
import signIn from '@/assets/Icons/signIn.png';

import { isKakaoInApp, isAndroid, isIOS } from '@/utils/detect';

export default function StepStart() {
  const { setStep } = useAuthStore();
  const { handleLogin } = useSocialLogin();
  const { isMobile } = useMediaQueries();

  // 인앱 브라우저일 경우 외부 브라우저로 강제 리디렉션
  const redirectToExternalBrowser = (provider: 'KAKAO' | 'GOOGLE') => {
    const origin = window.location.origin; // 현재 환경(dev/prod) 자동 반영
    const loginUrl = `${origin}/?type=${provider}`;

    if (isKakaoInApp()) {
      if (isAndroid()) {
        const intentUrl = `intent://${origin.replace(/^https?:\/\//, '')}/?type=${provider}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
          loginUrl
        )};end;`;
        window.location.href = intentUrl;
      } else if (isIOS()) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(loginUrl)}`;
      }
      return true; // 인앱이라 리디렉션 처리됨
    }

    return false; // 외부 브라우저라 로그인 진행 가능
  };

  // 로그인 버튼 클릭 핸들러
  const handleClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (!redirectToExternalBrowser(provider)) {
      handleLogin(provider); // 인앱이 아니면 기존 로그인 로직 수행
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
