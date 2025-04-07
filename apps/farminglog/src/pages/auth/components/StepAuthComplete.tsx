import { useEffect } from 'react';
import * as S from '../styles/StepAuthComplete.Stlyed.ts';
import useMediaQueries from '@/hooks/useMediaQueries';
import AuthButton from './AuthButton';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import { isKakaoInApp, isAndroid, isIOS } from '@/utils/detect';
import { useSearchParams, useNavigate } from 'react-router';

export default function StepAuthComplete() {
  const { isMobile } = useMediaQueries();
  const { handleLogin } = useSocialLogin();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const type = searchParams.get('type') as 'KAKAO' | 'GOOGLE' | null;

  // 외부 브라우저 도착 시 자동 로그인
  useEffect(() => {
    if (type === 'KAKAO' || type === 'GOOGLE') {
      handleLogin(type);
      navigate('/', { replace: true }); // 쿼리 제거
    }
  }, [type, handleLogin, navigate]);

  // 인앱이면 외부 브라우저로 이동
  const redirectToExternalBrowser = (provider: 'KAKAO' | 'GOOGLE') => {
    const origin = window.location.origin;
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
      return true;
    }

    return false;
  };

  const handleClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (!redirectToExternalBrowser(provider)) {
      handleLogin(provider); // 외부 브라우저에서 실행
    }
  };

  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>인증이 완료되었습니다!</S.Title>
      <S.SubTitle $isMobile={isMobile}>이어서 진행해주세요.</S.SubTitle>
      <S.ButtonContainer $isMobile={isMobile}>
        <AuthButton provider="google" onClick={() => handleClick('GOOGLE')} />
        <AuthButton provider="kakao" onClick={() => handleClick('KAKAO')} />
      </S.ButtonContainer>
    </S.Container>
  );
}
