import { ReactNode } from 'react';
import * as S from './styles/indexStyled';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useAuthStore } from '@/stores/useAuthStore';

interface AuthPageLayoutProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthPageLayoutProps) => {
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  const { step } = useAuthStore();

  const isStart = step === 'start';

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
