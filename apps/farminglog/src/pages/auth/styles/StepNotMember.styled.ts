import styled from 'styled-components';
import logoImg from '@/assets/logos/logo.dark.png';

interface ResponsiveProps {
  $isMobile: boolean;
}

export const Container = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? '0.8rem' : '1.7rem')};
  align-items: center;
  width: 100%;
`;

export const LogoIcon = styled.img.attrs({
  src: logoImg,
  alt: 'logoImg',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '56.23px' : '112.46px')};
  transform: rotate(25deg); /* ← 살짝 오른쪽 기울기 효과 */
`;

export const Title = styled.h2<ResponsiveProps>`
    color: #2e2e2e;
    font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '32px')};
    font-family: 'Pretendard Variable';
    font-weight: 700;
    line-height: ${({ $isMobile }) => ($isMobile ? '24px' : '40px')}; 
    word-wrap: break-word;
    text-align: center;
`;

export const SubTitle = styled.p<ResponsiveProps>`
  color: #2e2e2e;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  margin-top: 0.7rem;
  font-family: 'Pretendard Variable';
  font-weight: 500;
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '36px')};
  word-wrap: break-word;
  text-align: center;
  white-space: pre-wrap;
`;

export const Button = styled.button<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '80px' : '200px')};
  height: ${({ $isMobile }) => ($isMobile ? '30px' : '50px')};
  background-color: #999999;
  box-shadow: 0px 2px 10px rgba(25, 25, 25, 0.2);
  color: #fcfcfc;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: ${({ $isMobile }) => ($isMobile ? '30px' : '48px')};
`;

export const ErrorMessage = styled.p<ResponsiveProps>`
  color: #ff4d4f;
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '12px')};
  font-family: 'Pretendard Variable';
  text-align: left;
`;
