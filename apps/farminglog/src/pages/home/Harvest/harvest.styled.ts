import styled, { keyframes } from "styled-components";

/** 메인 컨테이너 */
export const HarvestContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  position: relative; /* 추가: 절대 위치 자식 요소의 기준 */
  width: 100%;
  max-width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "90%" : $isTablet ? "90%" : "1200px"};
  min-height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "40%" : $isTablet ? "40%" : "400px"};
  margin: 0 auto;
  padding: 20px;
  background-color: ${({ $isMobile }) => ($isMobile ? "#f9f9f9" : "#fff")};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? "10px" : "20px")};
`;

/** 메인 텍스트 (타이틀) */
export const MainText = styled.h1<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  font-size: 36px;
  font-weight: 600;
  font-family: "Pretendard Variable";
  line-height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "34px" : $isTablet ? "38px" : "42px"};
  letter-spacing: -0.24px;
  margin-bottom: 12px;
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
  font-family: "Pretendard Variable";
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
  $anyCleared: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 12px;

  /* anyCleared가 true면 gap을 줄이고, 아니면 기존 로직 */
  gap: ${({ $isMobile, $isTablet, $anyCleared }) => {
    if ($anyCleared) return $isMobile ? "10px" : $isTablet ? "10px" : "10px";
    return $isMobile ? "10px" : $isTablet ? "10px" : "10px";
  }};
  
  flex-wrap: wrap;
`;

/** 기존(원형+텍스트) 스테이지 버튼 */
export const StageButton = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "8px" : $isTablet ? "12px" : "10px"};
  cursor: pointer;
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "16px" : $isTablet ? "18px" : "20px"};
  font-weight: 700;
  font-family: "Pretendard Variable";
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
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};
  background-color: #4caf50;
  border-radius: 50%;
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
  font-family: "Pretendard Variable";
`;

/** 평행사변형 버튼 */
export const ParallelogramBox = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
  $isActive: boolean; // 현재 버튼이 클리어인지
}>`
  position: relative;
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "60px" : $isTablet ? "70px" : "80px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};

  /* 평행사변형 효과 */
  transform: skewX(-10deg);

  /* isActive(true)면 주황색, false면 회색 */
  background-color: ${({ $isActive }) => ($isActive ? "#FFA500" : "gray")};
  border-radius: 10px;


  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

box-shadow: ${({ $isActive }) =>
  $isActive
    ? "inset 5px 5px rgba(243, 106, 21, 1)"
    : "none"};

  /* 평행사변형 안의 실제 컨텐츠를 다시 skewX(10deg)로 보정 */
  .content {
    transform: skewX(10deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;

    font-weight: bold;
    font-family: "Pretendard Variable";
    color: #fff;
  }

  &:hover {
    opacity: 0.8;
  }
`;

/** 평행사변형 + 라벨 감싸는 컨테이너 */
export const Stage = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;

  font-size: ${({ $isMobile, $isTablet }) =>
  $isMobile ? "16px" : $isTablet ? "18px" : "20px"};
  font-weight: 700;
  font-family: "Pretendard Variable";
  line-height: 26px;
  letter-spacing: -0.24px;
`;


/* 새싹 애니메이션: 중앙에서 시작해 CSS 변수(--tx, --ty) 만큼 이동하며 커졌다가 사라짐 */
const sproutExplosion = keyframes`
  0% {
    transform: translate(0, 0) scale(0);
    opacity: 1;
  }
  50% {
    transform: translate(calc(var(--tx) / 2), calc(var(--ty) / 2)) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(var(--tx), var(--ty)) scale(1.5);
    opacity: 0;
  }
`;

export const GlobalSproutAnimation = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;

  .sprout {
    position: absolute;
    font-size: 30px;
    font-family: "Pretendard Variable";
    line-height: 30px;
    width: 30px;
    height: 30px;
    opacity: 0;
    animation: ${sproutExplosion} 1s forwards;
  }
`;