import styled, { keyframes } from "styled-components";

/** 메인 컨테이너 */
export const HarvestContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  position: relative;
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
  border-radius: 3px;
`;

/** 메인 텍스트 (타이틀) */
export const MainText = styled.h1<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  font-size: ${({ $isMobile }) => ($isMobile ? "24px" : "36px")};
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
  gap: 10px;
  flex-wrap: wrap;
`;

/** 원형 아이콘 이미지 */
export const IconImg = styled.img<{
  $isMobile: boolean;
  $isTablet: boolean;
  $isActive: boolean;
}>`
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "20px" : $isTablet ? "25px" : "30px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "20px" : $isTablet ? "25px" : "30px"};
  filter: ${({ $isActive }) =>
    $isActive
      ? "grayscale(100%) brightness(1.15)"
      : "opacity(0.5) drop-shadow(0 0 0 #575656)"};
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
  $isActive: boolean;
}>`
  position: relative;
  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "60px" : $isTablet ? "70px" : "80px"};
  height: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "50px" : $isTablet ? "60px" : "70px"};
  transform: skewX(-10deg);
  background-color: ${({ $isActive }) => ($isActive ? "#FFA500" : "#FCFCFC")};
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? "inset 5px 5px rgba(243, 106, 21, 1)"
      : "inset 5px 5px rgb(209, 209, 209)"};

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

/* 애니메이션 정의 */

/** 폭발 애니메이션: 버튼 주변에서 퍼져나감 */
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

/** 모으기 애니메이션: 폭발 후 목표 위치로 이동 (목표 위치는 inline CSS 변수 --dx, --dy로 적용) */
const gatherToTopRight = keyframes`
  0% {
    transform: translate(var(--tx), var(--ty)) scale(1.5);
    opacity: 1;
  }
  100% {
    transform: translate(calc(var(--tx) + var(--dx)), calc(var(--ty) + var(--dy))) scale(0);
    opacity: 0;
  }
`;

/** GlobalSproutAnimation: 뷰포트 전체에 고정된 컨테이너 */
export const GlobalSproutAnimation = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
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
    animation: ${sproutExplosion} 1s forwards, ${gatherToTopRight} 0.8s 1s forwards;
  }
`;


export const InfoContationer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  position: relative;
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
  border-radius: 3px;
`;

export const InfoButton = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
`;