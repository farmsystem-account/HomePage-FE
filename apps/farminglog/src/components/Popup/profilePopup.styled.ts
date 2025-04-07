import styled from "styled-components";

/** 팝업 뒷배경 오버레이 */
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
  z-index: 9998;
`;

/** 팝업 박스 */
export const PopupBox = styled.div<{$isMobile: boolean; $isTablet: boolean}>`
  position: relative;
  background: var(--FarmSystem_White, #FCFCFC);
  box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);
  overflow: hidden;
  border-radius: 10px;

  /* 반응형 크기 */
  width: ${({ $isMobile }) => ($isMobile ? "250px" : "500px")};
  height: ${({ $isMobile }) => ($isMobile ? "150px" : "300px")};

  /* 패딩은 모바일/데스크톱 상황에 맞게 조정 */
  padding: ${({ $isMobile }) => ($isMobile ? "16px 0" : "24px 0")};

  z-index: 9999;
`;

/** 닫기 버튼 */
export const CloseIconButton = styled.button<{$isMobile: boolean}>`
  position: absolute;
  top: ${({ $isMobile }) => ($isMobile ? "12px" : "20px")};
  right: ${({ $isMobile }) => ($isMobile ? "12px" : "20px")};
  background: none;
  border: none;
  cursor: pointer;
  width: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  height: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 필요하다면 outline 효과도 추가 가능
  &::before {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    outline: 2px #29d4a7 solid;
    outline-offset: -1px;
  }
  */
`;

/** 프로필(이미지 + 텍스트) 전체 영역 */
export const ProfileLayoutRow = styled.div<{$isMobile: boolean}>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: ${({ $isMobile }) => ($isMobile ? "6px" : "12px")};

  /* 상단 마진을 Figma 스타일에 맞추어 조절 */
  margin-top: ${({ $isMobile }) => ($isMobile ? "20px" : "50px")};
  margin-left: ${({ $isMobile }) => ($isMobile ? "20px" : "70px")};
`;

/** 프로필 이미지 영역(원) */
export const ProfileCircle = styled.div<{$isMobile: boolean}>`
  width: ${({ $isMobile }) => ($isMobile ? "50px" : "120px")};
  height: ${({ $isMobile }) => ($isMobile ? "50px" : "120px")};
  border-radius: 50%;
  background: #f5f5f5;
  /* Figma에서 outline 적용 */
  border: 2px solid #29d4a7;

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
    font-size: ${({ $isMobile }) => ($isMobile ? "24px" : "48px")};
  }
`;

/** 프로필 텍스트(이름/학과 등) 감싸는 박스 */
export const InfoBox = styled.div<{$isMobile: boolean}>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${({ $isMobile }) => ($isMobile ? "5px" : "17px")};
`;

/** 이름(예: 박팜) */
export const PopupTitle = styled.h2<{$isMobile: boolean; $isTablet: boolean}>`
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "24px")};
  font-weight: bold;
  margin: 0;
  font-family: "Pretendard Variable";
  color: #191919;
`;

/** 부가 텍스트(예: 4기 보안/웹 | 경영정보학과) */
export const PopupText = styled.p<{$isMobile: boolean; $isTablet: boolean}>`
  margin: 6px 0 0;
  font-size: ${({ $isMobile }) => ($isMobile ? "10px" : "16px")};
  color: #333;
  font-family: "Pretendard Variable";

  a {
    margin: 0 5px;
    color: #29d4a7;
    text-decoration: none;
  }
`;

/** 구분선(Figma에서 outline 처럼 사용) */
export const Divider = styled.hr<{$isMobile: boolean}>`
  width: 100%;
  margin-top: ${({ $isMobile }) => ($isMobile ? "18px" : "40px")};
  margin-bottom: ${({ $isMobile }) => ($isMobile ? "8px" : "16px")};

  border: none;
  /* outline과 비슷한 효과 → border-top */
  border-top: 1px solid #29d4a7;
`;

/** 하단 깃허브 아이디 표시 영역 */
export const PopupBottomText = styled.p<{$isMobile: boolean; $isTablet: boolean}>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: ${({ $isMobile }) => ($isMobile ? "8px" : "16px")};
  color: #2e2e2e;
  font-family: "Pretendard Variable";
  line-height: 20px;
`;

