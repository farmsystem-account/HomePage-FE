import styled from "styled-components";

interface LayoutProps {
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const Container = styled.div<LayoutProps>`
  padding: ${({ $isMobile }) => ($isMobile ? "100px 8px": "100px 20px")};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
`;

export const NewsPageTitle = styled.h2<LayoutProps>`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--FarmSystem_Green01, #28723F);
  font-size:  ${({ $isMobile }) => ($isMobile ? "32px": "40px")};
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 100% */

  padding: 10px 0;
  width: 100%;
  max-width: 1000px;
  margin-top: ${({ $isMobile }) => ($isMobile ? "0": "20px")};;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "30px": "70px")};
`;
