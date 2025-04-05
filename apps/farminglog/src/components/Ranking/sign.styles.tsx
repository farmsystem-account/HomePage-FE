import styled from "styled-components";

interface ResponsiveProps {
    $isApp?: boolean;
    $isMobile?: boolean;
    $isTablet?: boolean;
    $isDesktop?: boolean;
  }

export const FarmingLogEditorContainer = styled.div<ResponsiveProps>`
  width: ${({ 
    $isApp, $isMobile, 
    $isTablet, $isDesktop 
  }) => ($isApp ? '290px' : $isMobile ? '350' : $isTablet ? '700px' : $isDesktop ? '800px' : '1100px')};
  height: screen;
  padding: 15px 12px 0px 13px;
  // padding: ${({ $isApp }) => ($isApp ? '20px 15px 0px 15px' : '')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '15px' : '40px')};
  // background: linear-gradient(135deg, #4ade80, #14b8a6);
  border-radius: 5px;
`;

export const FarmingLogEditorContainerHeader = styled.div<ResponsiveProps>`
  width: ${({ $isApp, $isMobile }) => ($isApp ? '220px' : $isMobile ? '400px' : '500px')};
  height: ${({ $isApp }) => ($isApp ? '70px' : '130px')};
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid #FFF763;
  background: #FFFAA4;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const HeaderPinContainer = styled.div<ResponsiveProps>`
  width: 100%;
  height: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  z-index: 1;
`;

export const HeaderPin = styled.div<ResponsiveProps>`
  display: flex;
  width: ${({ $isApp }) => ($isApp ? '11px' : '20px')};
  height: ${({ $isApp }) => ($isApp ? '11px' : '20px')};
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin: 3px 6px 0px 6px;

  border-radius: ${({ $isApp }) => ($isApp ? '6px' : '100px')};
  background: #FF9A4D;
  box-shadow: 0px 2px 2px 0px #FF6F00 inset;
`;

export const HeaderPinIcon = styled.img<ResponsiveProps>`
  width: ${({ $isApp }) => ($isApp ? '7px' : '10px')};
  height: ${({ $isApp }) => ($isApp ? '7px' : '10px')};
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const HeaderContext = styled.h3<ResponsiveProps>`
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '15px' : '18px')};
  font-style: normal;
  font-weight: 500;
  line-height: ${({ $isApp }) => ($isApp ? '13px' : '26px')}; 
  margin-top: ${({ $isApp }) => ($isApp ? '13px' : '23px')};
  letter-spacing: -0.24px;
`;

export const HeaderContextBold = styled.span`
  font-weight: 700;
`;