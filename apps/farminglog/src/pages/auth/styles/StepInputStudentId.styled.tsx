import styled from 'styled-components';
import logoImg from '@/assets/logos/logo.dark.png';

interface ResponsiveProps {
  $isMobile: boolean;
}

export const Container = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isMobile }) => ($isMobile ? '0.2rem' : '0.5rem')};
  align-items: center;
  width: 100%;
`;

export const LogoIcon = styled.img.attrs({
  src: logoImg,
  alt: 'logoImg',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '56.23px' : '112.46px')};
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

export const InputWrapper = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  width: ${({ $isMobile }) => ($isMobile ? '181px' : '305px')};
  max-width: 360px;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-family: 'Pretendard Variable';
  color: #999;
  text-align: center; 
  line-height: 1; 
  height: 100%; 

  p {
    margin-top: 10px;
    font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '14px')};
    font-family: 'Pretendard Variable';
    color: #666;
    text-align: left;
  }
`;

export const Input = styled.input<ResponsiveProps>`
  margin-top: ${({ $isMobile }) => ($isMobile ? '0.3rem' : '1.5rem')};
  width: ${({ $isMobile }) => ($isMobile ? '150px' : '250px')};
  height: ${({ $isMobile }) => ($isMobile ? '30px' : '40px')};
  padding: ${({ $isMobile }) => ($isMobile ? '0.5rem' : '0.55rem')} 1rem;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-family: 'Pretendard Variable';
  border: 1px solid #29d4a7;
  border-radius: 5px;
  background-color: #fcfcfc;
  outline: none;
`;

export const Button = styled.button<ResponsiveProps>`
  margin-top: ${({ $isMobile }) => ($isMobile ? '1rem' : '2rem')};
  width: ${({ $isMobile }) => ($isMobile ? '80px' : '180px')};
  height: ${({ $isMobile }) => ($isMobile ? '30px' : '50px')};
  background-color: #29d4a7;
  box-shadow: 0px 2px 10px rgba(25, 25, 25, 0.2);
  color: #fcfcfc;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export const Back = styled.div<ResponsiveProps>`
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '14px')};
  font-family: 'Pretendard Variable';
  color: #999;
  text-decoration: underline;
  cursor: pointer;
`;

export const ErrorMessage = styled.p<ResponsiveProps>`
  color: #ff4d4f;
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '12px')};
  font-family: 'Pretendard Variable';
  text-align: left;
`;
