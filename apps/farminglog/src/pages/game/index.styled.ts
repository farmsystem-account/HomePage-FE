import styled from 'styled-components';

export const GameContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: calc(100vh - 70px);
  
  @media (max-width: 768px) {
    padding: 15px;
    min-height: calc(100vh - 55px);
  }
`;

export const GameTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
  color: #2d5016;
  text-shadow: 0 2px 4px rgba(0,0,0,0.1);
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export const GameDescription = styled.p`
  font-size: 1.1rem;
  text-align: center;
  color: #495057;
  margin-bottom: 30px;
  line-height: 1.6;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  padding: 20px;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 15px;
  }
`;

export const ControlsInfo = styled.div`
  margin-top: 30px;
  background: #ffffff;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border: 1px solid #e9ecef;
  
  h3 {
    margin: 0 0 20px 0;
    color: #2d5016;
    font-size: 1.3rem;
    text-align: center;
  }
  
  .controls-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    
    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
  
  .control-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border: 1px solid #e9ecef;
    transition: all 0.2s ease;
    
    &:hover {
      background: #e9ecef;
      transform: translateY(-2px);
    }
    
    strong {
      color: #2d5016;
      font-size: 1.1rem;
      margin-bottom: 5px;
    }
    
    span {
      color: #6c757d;
      font-size: 0.9rem;
      text-align: center;
    }
  }
`;


