import { ReactNode } from 'react';
import * as S from '../styles/indexStyled';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import bgImage from '@/assets/logos/FarmingLog.png';


interface AuthPageLayoutProps {
  children: ReactNode;
}

const Auth = ({ children }: AuthPageLayoutProps) => {
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  const { step } = useAuthStore();

  const isStart = step === 'start';

  return (
    <S.Wrapper>
      {!isStart && (
        <>
          <S.MovingTextBackground>
            <S.ScrollingText $isMobile={isMobile}>
              {Array.from({ length: 1000 }).map((_, i) => (
                <img
                  key={i}
                  src={bgImage}
                  alt="logo"
                  style={{
                    width: isMobile ? '180px' : '630px',
                    marginRight: '40px',
                    opacity: 0.8,
                  }}
                />
              ))}
            </S.ScrollingText>
          </S.MovingTextBackground>

          <S.MovingTextBottom>
            <S.ScrollingTextReverse $isMobile={isMobile}>
              {Array.from({ length: 1000 }).map((_, i) => (
                <img
                  key={i}
                  src={bgImage}
                  alt="logo"
                  style={{
                    width: isMobile ? '180px' : '630px',
                    marginRight: '40px',
                    opacity: 0.8,
                  }}
                />
              ))}
            </S.ScrollingTextReverse>
          </S.MovingTextBottom>
        </>
      )}
  

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
