import styled from 'styled-components';
import googleLogo from '@/assets/buttons/google.login.png'; 
import kakaoLogo from '@/assets/buttons/kakao.login.png'; 
import useMediaQueries from '@/hooks/useMediaQueries';

interface AuthButtonProps {
  provider: 'google' | 'kakao';
  onClick: () => void;
}

export default function AuthButton({ provider, onClick }: AuthButtonProps) {
  const { isMobile } = useMediaQueries();

  return (
    <Button onClick={onClick}>
      <Logo
        $isMobile={isMobile}
        src={provider === 'google' ? googleLogo : kakaoLogo}
        alt={provider === 'google' ? '구글 로그인' : '카카오 로그인'}
      />
    </Button>
  );
}

// AuthButton Styled Components

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
`;

const Logo = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '175px' : '300px')}; 
  transition: width 0.3s ease; 
`;