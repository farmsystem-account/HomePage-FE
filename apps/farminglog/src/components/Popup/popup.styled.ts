// Popup.styled.ts
import styled from "styled-components";

/** 팝업 뒷배경(오버레이) */
export const PopupOverlay = styled.div`
  position: fixed;
  inset: 0; /* top: 0; right: 0; bottom: 0; left: 0; 와 동일 */
  background: rgba(113, 113, 113, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

/** 팝업 컨테이너 박스 */
export const PopupBox = styled.div<{ $isMobile: boolean; $isTablet: boolean }>`
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "300px" : $isTablet ? "420px" : "500px"};
  background-color: #fcfcfc;
  border-radius: 15px;
  text-align: center;
  padding: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  z-index: 10000;
  position: relative; /* 내부 절대위치(닫기버튼 등) 배치 시 사용 */
`;

/** 상단 닫기 아이콘 버튼(프로필 팝업 등에) */
export const CloseIconButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  border: none;
  background: transparent;
  cursor: pointer;
  /* 예) X 아이콘 or svg 등 삽입 */
`;

/** 기본 제목/타이틀 */
export const PopupTitle = styled.p<{ $isMobile: boolean; $isTablet: boolean }>`
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "16px" : $isTablet ? "20px" : "22px"};
  font-weight: 700;
  color: #000;
  margin-bottom: 20px;
`;

/** 기본 텍스트 */
export const PopupText = styled.p<{ $isMobile: boolean; $isTablet: boolean }>`
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "13px" : $isTablet ? "15px" : "17px"};
  color: #000;
  margin-bottom: 20px;
`;

/** 구분선 */
export const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: #00a34a; /* 초록색 라인 등 */
  margin: 12px 0;
`;

/** 메시지 팝업용 확인 버튼 */
export const ConfirmButton = styled.button`
  margin-top: 20px;
  background-color: transparent;
  border: none;
  color: #000;
  font-weight: 600;
  cursor: pointer;
`;

/** 프로필 이미지 혹은 새싹 아이콘 감싸는 div */
export const ProfileCircle = styled.div`
  width: 80px;
  height: 80px;
  border: 2px solid #00a34a; 
  border-radius: 50%;
  margin: 0 auto 16px; /* 가운데 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  
  img {
    width: 60px;
    height: 60px;
  }
`;

/** 하단 버튼 컨테이너 (이슈에 따라 변경 가능) */
export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 20px;
`;

/** 알림/로그아웃 아이콘 컨테이너 (마이페이지 등 상단 우측) */
export const IconContainer = styled.div`
  position: absolute;
  top: 16px;
  right: 16px;
  display: flex;
  align-items: center;
  gap: 16px;

  .alarm {
    position: relative;
  }

  /* 빨간 점 */
  .alarm::after {
    content: "";
    display: block;
    width: 8px;
    height: 8px;
    background-color: red;
    border-radius: 50%;
    position: absolute;
    top: -2px;
    right: -4px;
  }

  /* 예시: 아이콘 클릭 영역 등 스타일 */
  button {
    background: transparent;
    border: none;
    cursor: pointer;
  }
`;
