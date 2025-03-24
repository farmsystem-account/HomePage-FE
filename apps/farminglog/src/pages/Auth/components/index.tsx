import { ReactNode } from 'react';
import * as S from '../styles/indexStyled';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useAuthStore } from '@/stores/useAuthStore';
//상태 확인용 추후 삭제 필요
import { useEffect } from 'react';


interface AuthPageLayoutProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthPageLayoutProps) => {
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  const { step } = useAuthStore();

  const isStart = step === 'start';

  ////// 상태 확인용 추후 삭제 필요

  const { setStep } = useAuthStore();

  useEffect(() => {
    setStep('start'); // 여기서 원하는 스텝으로 설정
  }, []);

  /////////

  return (
    <S.Wrapper>
      {isStart ? (
        // StepStart인 경우: Box 없음
        <S.FullscreenContainer
          $isApp={isApp}
          $isMobile={isMobile}
          $isTablet={isTablet}
          $isDesktop={isDesktop}
        >
          {children}
        </S.FullscreenContainer>
      ) : (
        <S.Box
          $isApp={isApp}
          $isMobile={isMobile}
          $isTablet={isTablet}
          $isDesktop={isDesktop}
        >
          {children}
        </S.Box>
      )}
    </S.Wrapper>
  );
};

export default Auth;
