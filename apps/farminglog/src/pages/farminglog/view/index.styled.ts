import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isDesktop?: boolean;
}

export const FarmingLogContainer = styled.div<ResponsiveProps>`
  width: ${({ $isApp, $isMobile }) => ($isApp ? '290px' : $isMobile ? '400' : '800px')};
  height: screen;
  padding: ${({ $isApp }) => ($isApp ? '20px 15px 0px 15px' : '')};
  display: flex;
  flex-direction: column;
  justify-content: center;
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

  ${({ $isApp }) => ($isApp ? '' : `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `)}
`;

export const FarmingLogContainerTitle = styled.h1<ResponsiveProps>`
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
  margin-left: ${({ $isApp }) => ($isApp ? '15px' : '25px')};
`;

export const FarmingLogCardContainer = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FarmingLogWriteButton = styled.button<ResponsiveProps>`
  position: fixed;
  bottom: 32px;
  right: 10px;
  // bottom: ${({ $isApp, $isMobile }) => ($isApp ? '32px' : $isMobile ? '50px' : '70px')};
  // right: ${({ $isApp, $isMobile }) => ($isApp ? '25px' : $isMobile ? '90px' : '180px')};

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

export const FarmingLogWriteButtonImage = styled.img<ResponsiveProps>`
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;