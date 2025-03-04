import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  margin: 20px;
  display: block;
`;

export const Message = styled.div<{$isMobile: boolean;}>`
  padding-top: 20vh;
  height: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: black;
  font-size: ${(props) => (props.$isMobile ? "20px" : "32px")};
  font-weight: 600;
  margin-bottom: 35px; 

  a {
    font-size: ${(props) => (props.$isMobile ? "10px" : "14px")};
    font-weight: 300;
    margin-top: 10px; 
  }
`;

export const NewsContainer = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;
`;
