import styled from 'styled-components';

export const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  min-height: 100vh;
`;

export const GameTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #333;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const GameDescription = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: #666;
  margin-bottom: 30px;
  line-height: 1.6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
