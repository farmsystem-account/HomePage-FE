import styled from 'styled-components';
import logoImg from '@/assets/logos/logo.basic.png';

interface ResponsiveProps {
  $isMobile: boolean;
}

export const Container = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? '1.25rem' : '2.5rem')};
  align-items: center;
  width: 100%;
`;

export const LogoIcon = styled.img.attrs({
  src: logoImg,
  alt: 'logoImg',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '34.3px' : '72.4px')};
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
  color: #2e2e2e;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 500;
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '36px')};
  word-wrap: break-word;
  text-align: center;
`;

export const ButtonGroup = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: row;
  gap: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  justify-content: center;
  align-items: center;
  margin-top: ${({ $isMobile }) => ($isMobile ? '1rem' : '2rem')};
`;


export const ConfirmButton = styled.button<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '200px' : '360px')};
  height: ${({ $isMobile }) => ($isMobile ? '36px' : '50px')};
  background-color: #29d4a7;
  color: #fcfcfc;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '18px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const CancelButton = styled(ConfirmButton)`
  background-color: #e0e0e0;
  color: #333;
`;
