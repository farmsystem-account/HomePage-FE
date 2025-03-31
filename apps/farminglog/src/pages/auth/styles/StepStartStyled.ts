import styled from 'styled-components';
import logoImg from '@/assets/logos/logo.basic.png';
import logoText from '@/assets/logos/logo.kr.png';

// 공통 Props 타입 정의
interface ResponsiveProps {
  $isMobile: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoIcon = styled.img.attrs({
  src: logoImg,
  alt: 'logoImg',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '145px' : '303px')};
`;

export const LogoText = styled.img.attrs({
  src: logoText,
  alt: 'logoText',
})<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '170px' : '430px')};
`;

export const SubText = styled.p<ResponsiveProps>`
  color: var(--FarmSystem_White, #FCFCFC);
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '32px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? '22px' : '40px')};
  word-wrap: break-word;
  text-align: center;
`;

export const ButtonGroup = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
  justify-content: center;
  align-items: center; 
  gap: ${({ $isMobile }) => ($isMobile ? '10px' : '30px')};
  width: 100%;
`;

export const Text = styled.p<ResponsiveProps>`
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '17px')};
  color: var(--FarmSystem_White, #FCFCFC);
  font-family: 'Pretendard Variable';
  margin-top: 10px;
`;

export const LinkWrapper = styled.div<ResponsiveProps>`
  display: inline-flex; 
  align-items: center;
  gap: 6px;

  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  color: #fffaA4;
  cursor: pointer;
  font-family: 'Pretendard Variable';
`;

export const GapWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  width: 100%;
`;
