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
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  cursor: pointer;
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
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  span {
    font-size: ${({ $isMobile }) => ($isMobile ? '24px' : '48px')};
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
  font-size: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
  color: #333;
  font-family: "Pretendard Variable";
  a {
      ${({ $isMobile }) => ($isMobile ? '0px 2px' : '0px 5px')};
     color: #29D4A7;
  }
`;

export const Divider = styled.hr<{ $isMobile: boolean }>`
  border: none;
  border-top: 1px solid #00c37d;
  margin-top: ${({ $isMobile }) => ($isMobile ? '18px' : '40px')};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
`;
export const PopupBottomText = styled.p<{ $isMobile: boolean; $isTablet: boolean }>`
  display: flex;
  font-size: ${({ $isMobile }) => ($isMobile ? '8px' : '16px')};
  color: #333;
  font-family: "Pretendard Variable";
  justify-content: center;
`;
