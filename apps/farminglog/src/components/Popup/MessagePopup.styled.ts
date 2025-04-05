import styled from 'styled-components';

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

export const PopupContainer = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '220px' : '400px')};
  height: ${({ $isMobile }) => ($isMobile ? '150px' : '250px')};
  position: relative;
  background: #FCFCFC;
  border-radius: 10px;
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  padding: 20px 20px 0px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainMessage = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '180px' : '300px')};
  text-align: center;
  color: #2E2E2E;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 500;
  line-height: ${({ $isMobile }) => ($isMobile ? '20px' : '30px')};
  word-wrap: break-word;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;

export const SubMessage = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '160px' : '300px')};
  text-align: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '20px' : '30px')};
  font-family: 'Pretendard Variable';
  font-weight: 500;
  color: #2E2E2E;
  
  .highlight {
    color: #29D4A7;
    font-weight: 700;
  }
`;

export const Divider = styled.hr<{ $isMobile: boolean }>`
  width: 100%;
  border: none;
  border-top: ${({ $isMobile }) => ($isMobile ? '1px' : '2px')} solid #5CD282;
  margin: ${({ $isMobile }) => ($isMobile ? '15px 0' : '20px 0')};
  outline-offset: -1px;
`;

export const ConfirmButton = styled.button<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '200px' : '200px')};
  background: none;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};
  font-family: 'Pretendard Variable';
  font-weight: 700;
  color: black;
  cursor: pointer;
`;
