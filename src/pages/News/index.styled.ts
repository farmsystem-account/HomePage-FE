import styled from 'styled-components';

export const Container = styled.div`
  padding: 100px 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  position: relative;
  overflow-y: auto;
`;

export const NewsPageTitle = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--FarmSystem_Green01, #28723F);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 100% */

  padding: 10px 20px;
  width: 100%;
  max-width: 1100px;
  margin-bottom: 70px;

  
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
