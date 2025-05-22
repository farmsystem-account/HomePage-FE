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

export const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  font-size: 18px;
  color: var(--FarmSystem_Red);
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