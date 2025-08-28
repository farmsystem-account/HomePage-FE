import styled from 'styled-components';

export const UnityContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 20px 0;
`;

export const UnityWrapper = styled.iframe`
  max-width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  
  &:hover {
    box-shadow: 0 6px 25px rgba(0, 0, 0, 0.15);
  }
`;

// 반응형 디자인을 위한 미디어 쿼리
export const ResponsiveUnityWrapper = styled(UnityWrapper)`
  @media (max-width: 768px) {
    width: 100% !important;
    height: 400px !important;
  }
  
  @media (max-width: 480px) {
    height: 300px !important;
  }
`;