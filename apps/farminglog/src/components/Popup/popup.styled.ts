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

export const PopupBox = styled.div<{ $isMobile: boolean; $isTablet: boolean }>`
  background: white;
  border-radius: 16px;
  padding: 24px;
  width: ${({ $isMobile }) => ($isMobile ? '200px' : '400px')};
  height: ${({ $isMobile }) => ($isMobile ? '150px' : '300px')};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
`;

export const CloseIconButton = styled.button`
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
`;

export const IconContainer = styled.div<{ $isMobile: boolean }>`
  position: absolute;
  top: 12px;
  right: 12px;
  display: flex;
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};
  margin-top: ${({ $isMobile }) => ($isMobile ? '6px' : '10px')};
  margin-right: ${({ $isMobile }) => ($isMobile ? '6px' : '10px')};

  .alarm {
    position: relative;
  }
`;

export const AlarmDot = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: red;
  border-radius: 50%;
`;

export const ProfileLayoutRow = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};
  margin-top: ${({ $isMobile }) => ($isMobile ? '25px' : '50px')};
  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '20px')};
`;

export const ProfileCircle = styled.div<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '50px' : '120px')};
  height: ${({ $isMobile }) => ($isMobile ? '50px' : '120px')};
  border-radius: 50%;
  background: #f5f5f5;
  border: 2px solid #00c37d;
  overflow: hidden;
  display: flex;
  align-items: start;
  justify-content: start;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const InfoBox = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${({ $isMobile }) => ($isMobile ? '5px' : '17px')};
`;

export const PopupTitle = styled.h2<{ $isMobile: boolean; $isTablet: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '24px')};
  font-weight: bold;
  margin: 0;
  font-family: "Pretendard Variable";
`;

export const PopupText = styled.p<{ $isMobile: boolean; $isTablet: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};
  color: #333;
  font-family: "Pretendard Variable";
`;

export const CenteredPopupText = styled.div<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};
  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
`;


export const Divider = styled.hr<{ $isMobile: boolean }>`
  border: none;
  border-top: 1px solid #00c37d;
  margin-top: ${({ $isMobile }) => ($isMobile ? '18px' : '40px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;

export const ConfirmButton = styled.button`
  display: block;
  width: 100%;
  padding: 12px;
  background-color: #00c37d;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  font-size: 16px;
`;
