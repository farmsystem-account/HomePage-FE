import styled from 'styled-components';

interface ContainerProps {
  $isMobile: boolean;
  $isTablet: boolean;
  $isDesktop: boolean;
}

export const Container = styled.div<ContainerProps>`
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

export const ProjectPageTitle = styled.h2<ContainerProps>`
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

export const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: var(--FarmSystem_Black);
`;

export const ErrorContainer = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  padding: ${({ $isMobile }) => ($isMobile ? "20px": "40px")};
  text-align: center;
  gap: 20px;
`;

export const ErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
  color: white;
  margin-bottom: 10px;
`;

export const ErrorTitle = styled.h2<ContainerProps>`
  font-size: ${({ $isMobile }) => ($isMobile ? "24px": "32px")};
  font-weight: 700;
  color: var(--FarmSystem_Black);
  margin: 0;
`;

export const ErrorMessage = styled.p<ContainerProps>`
  font-size: ${({ $isMobile }) => ($isMobile ? "16px": "18px")};
  color: var(--FarmSystem_DarkGrey);
  margin: 0;
  line-height: 1.5;
`;

export const RetryButton = styled.button<ContainerProps>`
  padding: ${({ $isMobile }) => ($isMobile ? "12px 24px": "16px 32px")};
  background: var(--FarmSystem_Green01);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: ${({ $isMobile }) => ($isMobile ? "14px": "16px")};
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 10px;

  &:hover {
    background: var(--FarmSystem_Green02);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: var(--FarmSystem_Black);
  margin-bottom: 16px;
`;

export const SectionContent = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: var(--FarmSystem_Black);
  white-space: pre-wrap;
`;

export const SectionImage = styled.img`
  width: 100%;
  max-width: 800px;
  height: auto;
  border-radius: 8px;
  margin: 20px 0;
`;

export const ParticipantsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

export const Participant = styled.span`
  background-color: var(--FarmSystem_Green06);
  color: var(--FarmSystem_White);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
`;

export const LinkSection = styled.div`
  display: flex;
  gap: 16px;
  margin-top: 40px;
`;

export const LinkButton = styled.a`
  display: inline-block;
  padding: 12px 24px;
  background-color: var(--FarmSystem_Green01);
  color: var(--FarmSystem_White);
  border-radius: 8px;
  text-decoration: none;
  font-weight: 500;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--FarmSystem_Green02);
  }
`;

// 간단한 스켈레톤 컨테이너
export const SkeletonContainer = styled.div<ContainerProps>`
  padding: ${({ $isMobile }) => ($isMobile ? "100px 8px": "100px 20px")};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
  color: var(--FarmSystem_Black);
  font-size: 18px;

  @keyframes skeleton-shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
`;

// 스켈레톤 레이아웃 카드
export const SkeletonDetailCard = styled.div<ContainerProps>`
  display: flex;
  width: 100%;
  max-width: 1000px;
  padding: ${({ $isMobile }) => ($isMobile ? "20px": "50px")};
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  border-radius: 20px;
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: skeleton-shimmer 1.2s ease-in-out infinite;
  box-shadow: 0px 0px 20px 5px var(--FarmSystem_LightGrey, #E5E5E5);
  gap: ${({ $isMobile }) => ($isMobile ? "20px": "70px")};
  min-height: 600px;

  @keyframes skeleton-shimmer {
    0% { background-position: 100% 50%; }
    100% { background-position: 0 50%; }
  }
`; 