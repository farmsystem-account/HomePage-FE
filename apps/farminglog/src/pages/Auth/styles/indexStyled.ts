import styled, { css, keyframes } from 'styled-components';

interface ResponsiveProps {
  $isMobile: boolean;
}

const floatScroll = keyframes`
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
`;


export const FloatingBackgroundTop = styled.div<ResponsiveProps>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100px;
  width: 100%; 
  display: flex;
  flex-direction: row;
  animation: ${floatScroll} 20s linear infinite;
  animation-delay: -10s;
  opacity: 0.9;
  pointer-events: none;
  z-index: 0;
  margin-top: 45px;

  & > img {
    width: ${({ $isMobile }) => ($isMobile ? '403px' : '1632px')};
    height: 100%;
    object-fit: cover;
  }
`;

export const FloatingBackgroundBottom = styled(FloatingBackgroundTop)`
  top: auto;
  bottom: 0;
  margin-top: 0;
  margin-bottom: 45px;
  animation-delay: -5s;
`;


export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  position: relative; 
  align-items: center;
  justify-content: center;
  //백그라운드 컬러 없애기
  background: linear-gradient(135deg, #4ade80, #14b8a6);
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
  max-width: 420px;
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
