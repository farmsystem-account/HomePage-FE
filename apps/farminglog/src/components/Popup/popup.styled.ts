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
  background: #FCFCFC;
  border-radius: ${({ $isMobile }) => ($isMobile ? '10px' : '16px')};
  padding-top: 24px;
  padding-bottom: 24px;
  width: ${({ $isMobile }) => ($isMobile ? '220px' : '400px')};
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
  margin-top: ${({ $isMobile }) => ($isMobile ? '20px' : '50px')};
  margin-left: ${({ $isMobile }) => ($isMobile ? '20px' : '36px')};

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

export const CenteredPopupText = styled.button<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '18px')};
  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  cursor: pointer;
`;

export const PopupContainer = styled.div<{ $isMobile: boolean }>`
  background: #FCFCFC;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const MainMessage = styled.p<{ $isMobile: boolean }>`
  padding-top: ${({ $isMobile }) => ($isMobile ? '14px' : '24px')};
  font-family: 'Pretendard Variable';
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '20px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '20px' : '30px')};
  color: #2E2E2E;
  text-align: center;
  margin: 0 0 ${({ $isMobile }) => ($isMobile ? '8px' : '16px')} 0;
`;

export const SubMessage = styled.p<{ $isMobile: boolean }>`
  font-family: 'Pretendard Variable';
  font-weight: 500;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '18px')};
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '26px')};
  color: #2E2E2E;
  text-align: center;
  margin: 0 0 ${({ $isMobile }) => ($isMobile ? '8px' : '16px')} 0;

  .highlight {
    color: #29D4A7;
    font-weight: 700;
  }
`;

export const Divider = styled.hr<{ $isMobile: boolean }>`
  width: 100%;
  border: none;
  border-top: ${({ $isMobile }) => ($isMobile ? '1px' : '2px')} solid #5CD282;
  margin: ${({ $isMobile }) => ($isMobile ? '16px 0 8px 0' : '32px 0 16px 0')};

`;

export const ConfirmButton = styled.button<{ $isMobile: boolean }>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '12px' : '44px')};
  background: none;
  border: none;
  cursor: pointer;
  font-family: 'Pretendard Variable';
  font-weight: 700;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '18px')};
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
`;