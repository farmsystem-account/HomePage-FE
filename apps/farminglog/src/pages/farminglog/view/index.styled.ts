import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const MainContainer = styled.div<ResponsiveProps>`
  display: flex;
  padding: 20px 20px 100px;
  min-height: 100vh;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FarmingLogContainer = styled.div<ResponsiveProps>`
  width: 100%;
  max-width: 75rem;
  min-height: 90vh;

  padding: ${({ $isApp }) => ($isApp ? '20px 16px 0px 16px' : '0')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
`;

export const FarmingLogContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isApp }) => ($isApp ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isApp }) => !$isApp && `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`;

export const FarmingLogContainerTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' :
    $isMobile ? '28px' :
    '36px'};
  font-style: normal;
  font-weight: 700;
  line-height: 130%;
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  height: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  flex-shrink: 0;
  margin-left: ${({ $isApp }) => ($isApp ? '0px' : '25px')};
`;

export const FarmingLogCardContainer = styled.div<ResponsiveProps>`
  width : 100%;
  max-width: 800px;
  display: flex;
  flex-direction: column;

  gap: 20px;
  padding: ${({ $isApp }) => ($isApp ?  '0' : '0 20px 0 20px')};
`;

export const EndOfList = styled.div<ResponsiveProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
  padding-bottom: 150px;
`;

export const EndOfListText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_Gray, #B7B7B7);
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' :
    $isMobile ? '24px' :
    '28px'};
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  letter-spacing: -0.24px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FarmingLogWriteButton = styled.button<ResponsiveProps>`
  position: fixed;
  bottom: 40px;
  right: ${({ $isApp, $isMobile, $isTablet, $isDesktop }) => {
  if ($isApp) return '16px';
  if ($isMobile) return '24px';
  if ($isTablet) return 'calc((100vw - 780px) / 2 + 20px)';
  if ($isDesktop) return 'calc((100vw - 980px) / 2 + 20px)';
  return '32px';
}};

  display: flex;
  width: ${({ $isApp, $isMobile }) => ($isApp ? '45px' : $isMobile ? '55px' : '70px')};
  height: ${({ $isApp, $isMobile }) => ($isApp ? '45px' : $isMobile ? '55px' : '70px')};
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;

  border-radius: 35px;
  background: #5CD282;
`;

export const FarmingLogWriteButtonImage = styled.img<ResponsiveProps>`
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  cursor: pointer;
`;

/** 페이지네이션 컨테이너 */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

/** 페이지네이션 버튼 컨테이너 */
export const PaginationButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

/** 페이지네이션 버튼 텍스트 */
export const PaginationButtonText = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  /* 사이즈 조절 */
  img[alt="nextArrow"]{
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    margin-right: 10px;
  }

  img[alt="jumpArrow"]{
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
  }

  /* nextArrow 이미지 회전 */
  img[alt="nextArrow_right"] {
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    transform: rotate(180deg);
    margin-left: 10px;
  }

  img[alt="jumpArrow_right"] {
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    transform: rotate(180deg);
  }
  
  &:hover {
    ${(props) => !props.$disabled && `
      background-color: ${props.$active ? 'var(--FarmSystem_Green06)' : '#f0f0f0'};
      transform: translateY(-1px);
    `}
  }
  
  &:active {
    ${(props) => !props.$disabled && `
      transform: translateY(0);
    `}
  }
`;

export const PaginationPageButton = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  width: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  height: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '13px' : '20px')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  background-color: ${(props) => (props.$active ? 'var(--FarmSystem_Green06)' : 'var(--FarmSystem_DarkGrey)')};
  color: white;
  font-size: ${(props) => (props.$isMobile ? '8px' : props.$isTablet ? '12px' : '14px')};
  font-weight: 500;
  transition: all 0.2s ease;
`;
