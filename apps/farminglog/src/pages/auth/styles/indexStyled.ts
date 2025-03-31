import styled, { css, keyframes } from 'styled-components';

interface ResponsiveProps {
  $isMobile: boolean;
}



const scrollText = keyframes`
  0% {
    transform: translateX(-300%);
    opacity: 0.6;
  }
  100% {
    transform: translateX(0%);
  }
`;

const scrollTextReverse = keyframes`
  0% {
    transform: translateX(0%);
    opacity: 0.6;
  }
  100% {
    transform: translateX(-300%);
  }
`;


export const MovingTextBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%; 
  white-space: nowrap;
  overflow: hidden;
  z-index: -1; 
`;

export const ScrollingText = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: row; 
  margin-top: 40px;
  gap: ${(props) => (props.$isMobile ? '50px' : '300px')}; 
  animation: ${scrollText} ${(props) => (props.$isMobile ? '90s' : '120s')} linear infinite;
`;

export const MovingTextBottom = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  z-index: -1;
`;

export const ScrollingTextReverse = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: row;
  margin-bottom: 40px;
  gap: ${(props) => (props.$isMobile ? '50px' : '300px')}; 
  animation: ${scrollTextReverse} ${(props) => (props.$isMobile ? '90s' : '120s')} linear infinite;
`;



export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative; 
  align-items: center;
  justify-content: center;
`;


export const Box = styled.div<{
  $isApp: boolean;
  $isMobile: boolean;
  $isTablet: boolean;
  $isDesktop: boolean;
}>`
  background-color: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  z-index: 1;

  ${(props) =>
    props.$isDesktop &&
    css`
      width: 600px;
      height: 500px;
    `}
  ${(props) =>
    props.$isMobile &&
    css`
      width: 280px;
      height: 300px;
    `}
  ${(props) =>
    props.$isTablet &&
    css`
      width: 600px;
      height: 500px;
    `}
`;

export const FullscreenContainer = styled.div<{
  $isApp: boolean;
  $isMobile: boolean;
  $isTablet: boolean;
  $isDesktop: boolean;
}>`
  width: 100%;
  height: 100%;
  z-index: 1;
`;
