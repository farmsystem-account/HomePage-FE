import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
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
      width: 440px; 
      height: 400px; 
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
`;
