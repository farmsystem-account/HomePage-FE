import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const CheerContainer = styled.div<ResponsiveProps>`
    max-width: ${({ 
    $isMobile, 
    $isTablet, $isDesktop 
  }) => ($isMobile ? '290px' : $isTablet ? '90%' : $isDesktop ? '1000px' : '1000px')};
  width: 100%;
  height: screen;
  padding: ${({ $isMobile }) => ($isMobile ? '14px 12px 0px 12px' : '')};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
  margin-top: ${({ $isMobile }) => ($isMobile ? '20px' : '50px')};
  margin-left: auto;
  margin-right: auto;
`;

export const CheerContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isMobile }) => ($isMobile ? '' : `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `)}
`;

export const CheerContainerTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '20px' : $isMobile ? '20px' : '36px')};
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 130% */
  letter-spacing: -0.24px;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '13px' : '0px')};
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  height: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  flex-shrink: 0;
  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '25px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '15px' : '0px')};
`;

export const CheerCardContainer = styled.div<ResponsiveProps>`
  display: ${({ $isDesktop, $isTablet }) => ($isDesktop || $isTablet ? 'flex' : 'flex')};
  flex-direction: ${({ $isDesktop, $isTablet }) =>
    $isDesktop || $isTablet ? 'row' : 'column'};
  flex-wrap: wrap;
  justify-content: center;
  row-gap: 30px;
  column-gap: 42px;
  margin: 20px 17px 0;

  & > * {
    width: ${({ $isDesktop, $isTablet }) =>
      $isDesktop || $isTablet ? '46%' : '100%'};
  }
  padding: ${({ $isDesktop, $isTablet }) =>
      $isDesktop || $isTablet ? '0px 75px' : '0px 25.5px'};
  padding-bottom: 40px;
`;
export const CheerWriteButton = styled.button<ResponsiveProps>`
  position: fixed;
  bottom: 40px;
  right: ${({ $isApp, $isMobile, $isTablet, $isDesktop }) => {
  if ($isApp) return '16px';
  if ($isMobile) return '24px';
  if ($isTablet) return 'calc((100vw - 780px) / 2 + 20px)';
  if ($isDesktop) return 'calc((100vw - 980px) / 2 + 40px)'; // Adjusted for more right alignment on desktop
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
  width: 25px;
  height: 25px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;