import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const CheerContainer = styled.div<ResponsiveProps>`
  width: ${({ 
    $isApp, $isMobile, 
    $isTablet, $isDesktop 
  }) => ($isApp ? '290px' : $isMobile ? '400px' : $isTablet ? '780px' : $isDesktop ? '1000px' : '1200px')};
  height: screen;
  padding: ${({ $isApp }) => ($isApp ? '20px 15px 0px 15px' : '')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
  margin: 0 auto;
`;

export const CheerContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isApp }) => ($isApp ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isApp }) => ($isApp ? '' : `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `)}
`;

export const CheerContainerTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '20px' : $isMobile ? '28px' : '36px')};
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 130% */
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  height: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  flex-shrink: 0;
  margin-left: ${({ $isApp }) => ($isApp ? '0px' : '25px')};
`;

export const CheerCardContainer = styled.div<ResponsiveProps>`
  display: ${({ $isDesktop, $isTablet }) => ($isDesktop || $isTablet ? 'flex' : 'flex')};
  flex-direction: ${({ $isDesktop, $isTablet }) =>
    $isDesktop || $isTablet ? 'row' : 'column'};
  flex-wrap: wrap;
  justify-content: space-between;
  row-gap: 30px;

  & > * {
    width: ${({ $isDesktop, $isTablet }) =>
      $isDesktop || $isTablet ? '48%' : '100%'};
  }
  padding: ${({ $isDesktop, $isTablet }) =>
      $isDesktop || $isTablet ? '0px 60px' : '0px 40px'};
  padding-bottom: 40px;
`;
export const CheerWriteButton = styled.button<ResponsiveProps>`
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

  border-radius: 35px;
  background: #5CD282;
`;

export const CheerWriteButtonImage = styled.img<ResponsiveProps>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;