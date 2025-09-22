import { useEffect, useState } from 'react';
import * as S from '../styles/StepStartStyled';
import AuthButton from './AuthButton';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useSocialLogin } from '@repo/auth/hooks/useSocialLogin';
import useMediaQueries from '@/hooks/useMediaQueries';
import signIn from '@/assets/Icons/signIn.png';

import { isKakaoInApp, isAndroid, isIOS } from '@/utils/detect';
import { useSearchParams, useNavigate } from 'react-router';
import Cookies from 'js-cookie';
import { usePublicApi } from '@repo/api/hooks/usePublicApi';

export default function StepStart() {
  const { setStep, setToken } = useAuthStore();
  const { handleLogin } = useSocialLogin();
  const { isMobile } = useMediaQueries();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [showViewerLogin, setShowViewerLogin] = useState(false);
  const [viewerId, setViewerId] = useState('');
  const [viewerPw, setViewerPw] = useState('');
  const [viewerError, setViewerError] = useState<string | null>(null);
  const { post } = usePublicApi();

  const type = searchParams.get('type') as 'KAKAO' | 'GOOGLE' | null;

  // 쿼리로 들어온 경우 자동 로그인 시도
  useEffect(() => {
    if (type === 'KAKAO' || type === 'GOOGLE') {
      handleLogin(type);
      navigate('/', { replace: true }); // 쿼리 파라미터 제거
    }
  }, [type, handleLogin, navigate]);

  // 인앱 브라우저일 경우 외부 브라우저로 강제 리디렉션
  const redirectToExternalBrowser = (provider: 'KAKAO' | 'GOOGLE') => {
    const origin = window.location.origin;
    const loginUrl = `${origin}/?type=${provider}`;

    if (isKakaoInApp()) {
      if (isAndroid()) {
        const intentUrl = `intent://${origin.replace(/^https?:\/\//, '')}/?type=${provider}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(loginUrl)};end;`;
        window.location.href = intentUrl;
      } else if (isIOS()) {
        window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(loginUrl)}`;
      }
      return true;
    }

    return false;
  };

  // 로그인 버튼 클릭 핸들러
  const handleClick = (provider: 'KAKAO' | 'GOOGLE') => {
    if (!redirectToExternalBrowser(provider)) {
      handleLogin(provider);
    }
  };

  // SW융합 교육원 뷰어역할로 로그인 (
  const handleViewerLogin = async () => {
    const validId = import.meta.env.VITE_UNION_VIEWER_ID;
    const validPw = import.meta.env.VITE_UNION_VIEWER_PW;

    if (!validId || !validPw) {
      setViewerError('뷰어 계정 환경변수(VITE_UNION_VIEWER_ID/PW)가 설정되지 않았습니다.');
      return;
    }

    if (viewerId !== validId || viewerPw !== validPw) {
      setViewerError('ID 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    try {
      // 임시 토큰 발급 (테스트용)
      const userId = Number(import.meta.env.VITE_UNION_VIEWER_NUM);
      type TokenDTO = { accessToken: string; refreshToken: string };
      const res = await post<{ status: number; data: TokenDTO }>(`/auth/token/${userId}`);
      const tokenWrapper = res as unknown as { status?: number; data?: TokenDTO } | { data?: { data?: TokenDTO } };
      const tokenData = (tokenWrapper as unknown as { data?: { data?: TokenDTO } })?.data?.data || (tokenWrapper as unknown as { data?: TokenDTO })?.data;
      const accessToken = tokenData?.accessToken as string | undefined;
      const refreshToken = tokenData?.refreshToken as string | undefined;

      if (accessToken && refreshToken) {
        Cookies.set('refreshToken', refreshToken, { secure: true, sameSite: 'Strict' });
        setToken(accessToken); // Authorization 즉시 활성화
        Cookies.set('limitWrite', 'true', { secure: true, sameSite: 'Strict' });
      }
    } catch {
      // 토큰 발급 실패해도 뷰어 세션으로 조회만 시도
    }

    // 뷰어 플래그 제거

    setViewerError(null);
    setShowViewerLogin(false);
    navigate('/home');
  };

  // step=input 감지해서 자동 인증 단계 진입
useEffect(() => {
  const step = searchParams.get('step');
  if (step === 'input') {
    setStep('input');
    navigate('/', { replace: true });
  }
}, [searchParams, setStep, navigate]);

// 회원 인증 클릭 핸들러
const handleVerifyClick = () => {
  const origin = window.location.origin;
  const verifyUrl = `${origin}/?step=input`;

  if (isKakaoInApp()) {
    if (isAndroid()) {
      const intentUrl = `intent://${origin.replace(/^https?:\/\//, '')}/?step=input#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(
        verifyUrl
      )};end;`;
      window.location.href = intentUrl;
    } else if (isIOS()) {
      window.location.href = `kakaotalk://web/openExternal?url=${encodeURIComponent(verifyUrl)}`;
    }
    return;
  }

  setStep('input');
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
        <S.LinkWrapper onClick={handleVerifyClick} $isMobile={isMobile}>
          회원 인증하기
          <img
            src={signIn}
            alt="signIn icon"
            style={{ width: isMobile ? '6.5px' : '9px', height: 'auto' }}
          />
        </S.LinkWrapper>
      </S.GapWrapper>

      {/* 뷰어 전용 로그인 토글 */}
      <div style={{ marginTop: isMobile ? '16px' : '24px' }}>
        <button
          style={{
            background: 'transparent',
            border: 'none',
            color: '#666',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => setShowViewerLogin((v) => !v)}
        >
          SW융합 교육원 뷰어 로그인
        </button>
      </div>

      {showViewerLogin && (
        <div style={{
          marginTop: isMobile ? '12px' : '16px',
          marginBottom: isMobile ? '12px' : '16px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px'
        }}>
          <input
            placeholder="ID"
            value={viewerId}
            onChange={(e) => setViewerId(e.target.value)}
            style={{
              width: isMobile ? '175px' : '190px',
              height: isMobile ? '32px' : '36px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '6px 10px',
              fontFamily: 'Pretendard Variable'
            }}
          />
          <input
            placeholder="비밀번호"
            type="password"
            value={viewerPw}
            onChange={(e) => setViewerPw(e.target.value)}
            style={{
              width: isMobile ? '175px' : '190px',
              height: isMobile ? '32px' : '36px',
              border: '1px solid #ccc',
              borderRadius: '6px',
              padding: '6px 10px',
              fontFamily: 'Pretendard Variable'
            }}
          />
          {viewerError && (
            <div style={{ color: '#ff4d4f', fontSize: isMobile ? '12px' : '13px' }}>
              {viewerError}
            </div>
          )}
          <button
            onClick={handleViewerLogin}
            style={{
              marginTop: '4px',
              width: isMobile ? '175px' : '190px',
              height: isMobile ? '36px' : '40px',
              backgroundColor: '#29d4a7',
              color: '#fff',
              border: 'none',
              borderRadius: '999px',
              cursor: 'pointer',
              fontFamily: 'Pretendard Variable',
              fontWeight: 600
            }}
          >
            뷰어로 시작하기
          </button>
        </div>
      )}
    </S.Container>
  );
}
