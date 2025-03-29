import styled, { keyframes } from 'styled-components';
import logo from '@/assets/logos/logo.basic.png'; 

export default function LoadingSkeleton() {
  return (
    <Container>
      <SpinningLogo src={logo} alt="로딩 중" />
    </Container>
  );
}

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1rem;
`;

const SpinningLogo = styled.img`
  width: 80px;
  height: 80px;
  animation: ${rotate} 2s linear infinite;
`;

