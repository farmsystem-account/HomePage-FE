// harvest.styled.ts
import styled from "styled-components";

/**
 * 모바일/태블릿/데스크톱 여부를 구분하는 prop
 *  - $isMobile: 768px 이하
 *  - $isTablet: 769px ~ 1024px 이하
 *  - 나머지: 데스크톱
 */

/** 메인 컨테이너 */
export const HarvestContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  width: 100%;
  /* 화면 크기에 따라 최대 너비 변경 */
  max-width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "90%" : $isTablet ? "90%" : "1200px"};
  min-height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "40%" : $isTablet ? "40%" : "400px"};
  margin: 0 auto;
  padding: 20px;

  /* 모바일일 때만 배경색 변경 */
  background-color: ${({ $isMobile }) => ($isMobile ? "#f9f9f9" : "#fff")};

  display: flex;
  flex-direction: column;
  align-items: center;
  /* 화면 크기에 따라 컨테이너 내부 간격 변경 */
  gap: ${({ $isMobile }) => ($isMobile ? "10px" : "20px")};
`;

/** 메인 텍스트 (타이틀) */
export const MainText = styled.h1<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  /* 모바일 / 태블릿 / 데스크톱에 따라 글자 크기 조절 */
  font-size: 1.5rem;
  font-weight: 700;

  /* 모바일 / 태블릿 / 데스크톱에 따라 줄간격 조절 */
  line-height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "34px" : $isTablet ? "38px" : "42px"};
  letter-spacing: -0.24px;

  margin-bottom: 12px;
  /* 모바일에서 위쪽 여백 축소 */
  padding-top: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  text-align: center;
`;

/** 서브 텍스트 */
export const SubText = styled.p<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "14px" : $isTablet ? "15px" : "16px"};
  font-weight: 400;
  line-height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "24px" : $isTablet ? "26px" : "30px"};
  letter-spacing: -0.24px;

  margin-bottom: 24px;
  text-align: center;
`;

/** 버튼들을 묶는 컨테이너 */
export const ButtonContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;

  /* 모바일/태블릿에서 간격 축소 */
  gap: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "20px" : $isTablet ? "25px" : "30px"};

  /* 화면이 좁으면 자동 줄바꿈 */
  flex-wrap: wrap;
`;

/** 스테이지(단계) 버튼 */
export const StageButton = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  display: flex;
  flex-direction: column; /* 아이콘 위, 텍스트 아래 배치 */
  align-items: center;
  /* 모바일/태블릿에서 버튼 간격 축소 */
  gap: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "8px" : $isTablet ? "10px" : "12px"};

  cursor: pointer;

  /* 폰트 크기 반응형 */
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "16px" : $isTablet ? "18px" : "20px"};
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.24px;

  &:hover {
    opacity: 0.8;
  }
`;

/** 원형 아이콘 div */
export const ButtonIcon = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  /* 모바일/태블릿/데스크톱에 따라 아이콘 크기 조절 */
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};

  background-color: #4caf50;
  border-radius: 50%;

  /* 내부 이미지 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 4px 4px 0px 0px #d8d8d8;
`;

/** 아이콘 이미지 */
export const IconImg = styled.img<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  /* 모바일/태블릿/데스크톱에 따라 이미지 크기 조절 */
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "20px" : $isTablet ? "25px" : "30px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "20px" : $isTablet ? "25px" : "30px"};
`;

/** 버튼 하단 라벨 */
export const ButtonLabel = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "14px" : $isTablet ? "15px" : "16px"};
  text-align: center;
`;
