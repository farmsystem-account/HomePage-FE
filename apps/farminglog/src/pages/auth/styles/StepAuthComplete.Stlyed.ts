import styled from 'styled-components';
import logoImg from '@/assets/logos/logo.dark.png';

interface ResponsiveProps {
  $isMobile: boolean;
}

export const Container = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? '0.2rem' : '1.5rem')};
  align-items: center;
  width: 100%;
`;

export const LogoIcon = styled.img.attrs({
  src: logoImg,
  alt: 'logoImg',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '56.23px' : '112.46px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '1rem' : '2rem')};
`;

export const Title = styled.h2<ResponsiveProps>`
  color: #2e2e2e;
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '32px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '36px')};
  word-wrap: break-word;
  text-align: center;
`;

export const SubTitle = styled.p<ResponsiveProps>`
  margin-top: 1.5rem;
  color: #2e2e2e;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 500;
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '36px')};
  word-wrap: break-word;
  text-align: center;
`;

export const ButtonContainer = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? '1rem' : '1.2rem')};
  justify-content: space-between;
  align-items: center;
  margin-top: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '3rem')};
`