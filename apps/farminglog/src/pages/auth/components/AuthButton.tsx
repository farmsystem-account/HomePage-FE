import styled from 'styled-components';
import googleLogo from '@/assets/logos/google.login.png'; 
import kakaoLogo from '@/assets/logos/kakao.login.png'; 
import useMediaQueries from '@/hooks/useMediaQueries';

interface AuthButtonProps {
  provider: 'google' | 'kakao';
  onClick: () => void;
}

const providerMap = {
  google: {
    logo: googleLogo,
    text: '구글에서 로그인',
    bgColor: '#ffffff',
    textColor: '#1f1f1f',
    borderColor: '#747775',
  },
  kakao: {
    logo: kakaoLogo,
    text: '카카오 로그인',
    bgColor: '#FEE500',
    textColor: '#1f1f1f',
    borderColor: '#FEE500',
  },
};

export default function AuthButton({ provider, onClick }: AuthButtonProps) {
  const { isMobile } = useMediaQueries();
  const { logo, text, bgColor, textColor, borderColor } = providerMap[provider];

  return (
    <Button
      onClick={onClick}
      $bgColor={bgColor}
      $textColor={textColor}
      $borderColor={borderColor}
      $isMobile={isMobile}
    >
      <Logo $isMobile={isMobile} src={logo} alt={text} />
      <Text $isMobile={isMobile}>{text}</Text>
    </Button>
  );
}

// Styled Components

const Button = styled.button<{
  $bgColor: string;
  $textColor: string;
  $borderColor: string;
  $isMobile: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${({ $isMobile }) => ($isMobile ? '175px' : '190px')};
  height: ${({ $isMobile }) => ($isMobile ? '40px' : '45.7px')};
  gap: 8px;
  padding: 10px;
  border: 1px solid ${({ $borderColor }) => $borderColor};
  border-radius: 999px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $textColor }) => $textColor};
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.9;
  }
`;

const Logo = styled.img<{ $isMobile: boolean }>`
  width: 20px;
  height: 20px;
`;

const Text = styled.span<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '13px' : '14px')};
  font-weight: 500;
`;
