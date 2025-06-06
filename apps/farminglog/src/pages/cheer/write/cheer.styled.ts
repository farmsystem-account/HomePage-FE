//cheer.styled.ts
import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

/* ====== 전체 컨테이너 ====== */
export const CheerContainer = styled.div<ResponsiveProps>`
  max-width: ${({ 
    $isMobile, 
    $isTablet, $isDesktop 
  }) => ($isMobile ? '290px' : $isTablet ? '90%' : $isDesktop ? '1000px' : '1000px')};
  width: 100%;
  height: 100%; 
  padding: ${({ $isMobile }) => ($isMobile ? '14px 12px 0px 12px' : '')};
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '0px' : '40px')};

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
  margin-top: ${({ $isMobile }) => ($isMobile ? '20px' : '50px')};
  margin-left: auto;
  margin-right: auto;
  margin-bottom: ${({ $isMobile }) => ($isMobile ? '20px' : '50px')};
`;

/* ====== 헤더 ====== */
export const CheerContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isMobile }) => ($isMobile ? '' : `
    background: var(--FarmSystem_White, #FCFCFC);
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  `)}
`;

export const CheerContainerTitle = styled.h1<ResponsiveProps>`
 grid-column: 2;
  color: #2e2e2e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '36px')};
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  height: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  margin-left: ${({ $isMobile }) => ($isMobile ? '0px' : '27px')};

  border: none;
  background: none;
  cursor: pointer;
`;
/* 작은 서브타이틀 */
export const HeaderText = styled.h3<ResponsiveProps>`
  margin-top: ${({ $isMobile }) => ($isMobile ? '20px' : '30px')};
  margin-left: ${({ $isMobile }) => ($isMobile ? '27px' : '0')};
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '24px')};
  font-weight: 500;
  color: #191919;
  font-family: "Pretendard Variable";
  text-align: ${({ $isMobile }) => ($isMobile ? 'left' : 'center')};
  width: 100%; /* Ensure proper alignment */
`;

/* 메인 타이틀 */
export const MainTitle = styled.h2<ResponsiveProps>`
  margin: 0;
  font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '36px')};
  font-family: "Pretendard Variable";
  font-weight: 700;
  color: #2e2e2e;
  text-align: ${({ $isMobile }) => ($isMobile ? 'left' : 'center')};
  width: 100%; /* Ensure proper alignment */
  margin-left: ${({ $isMobile }) => ($isMobile ? '27px' : '0')};
`;

/* ====== 카드 영역 ====== */
export const CheerCard = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ $isMobile, $isTablet, $isDesktop }) =>
    $isMobile ? '240px' : $isTablet ? '450px' : $isDesktop ? '813px' : '450px'};
  padding: ${({ $isApp, $isTablet }) =>
    $isApp ? '10px 5px' : $isTablet ? '15px 8px' : '20px 10px'};
`;

/* 카드 안의 내용 래핑 */
export const ContentWrapper = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '30px')};
  width: 100%;
  font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '20px')};
  align-items: center;

  a {
    text-align: left; 
    width: 100%; 
`;

/* ====== 카테고리 영역 (3개 버튼) ====== */
export const CategoryContainer = styled.div`
  display: flex;
  gap: 8px; /* 카테고리 사이 간격 */
  justify-content: flex-end;
  width: 100%;
`;

/** 
 * 카테고리 버튼
 * - $isSelected: 선택 상태
 * - $fontColor: 폰트 색 
 */
interface CategoryItemProps {
  $isSelected?: boolean;
  $fontColor?: string;
  $bgColor?: string;
}

export const CategoryItem = styled.div<CategoryItemProps & ResponsiveProps>`

  width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? '50px' : $isTablet ? '70px' : '90px'};
  text-align: center;
  padding: ${({ $isMobile, $isTablet }) =>
    $isMobile ? '2px 0px' : $isTablet ? '6px 10px' : '10px 15px'};
  border-radius: ${({ $isMobile, $isTablet }) =>
    $isMobile ? '10px' : $isTablet ? '15px' : '20px'};
  cursor: pointer;

  /* 선택된 버튼은 어두운 배경, 미선택은 기본 초록 */
  background-color: ${({ $bgColor }) => $bgColor || '#fcfcfc'};
  /* 폰트 색상은 props로 받되, 기본은 흰색 */
  color: ${({ $fontColor }) => $fontColor || '#FFFFFF'};

  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile, $isTablet }) =>
    $isMobile ? '10px' : $isTablet ? '13px' : '15px'};
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.24px;

  &:hover {
    filter: brightness(0.9);
  }
`;

/* ====== 입력 영역 ====== */
export const InputArea = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '15px')};
  width: ${({ $isMobile, $isDesktop }) =>
    $isMobile ? '205px' : $isDesktop ? '813px' : '420px'};
`;

export const InputHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const InputTitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;

export const InputTitle = styled.p<ResponsiveProps>`
  color: #2e2e2e;
  font-size: ${({ $isApp }) => ($isApp ? '12px' : '20px')};
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.24px;
  margin: 0;
`;

export const SmallText = styled.p<ResponsiveProps>`
  color: #757575;
  font-size: ${({ $isApp }) => ($isApp ? '8px' : '12px')};
  font-weight: 500;
  line-height: 14px;
  letter-spacing: -0.24px;
  margin: 0;
`;

/** textarea에 배경색을 주기 위해 $bgColor props 추가 */
export const MessageTextarea = styled.textarea<{ $bgColor?: string }>`
  width: 100%;
  height: 100px; // 기본 고정 높이
  max-height: 300px; // (선택) 최대 높이 제한
  padding: 5px 10px;
  border-radius: 5px;
  outline: none;
  background: ${({ $bgColor }) => $bgColor || '#ccc'};
  color: #2e2e2e;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.24px;
  resize: none;
  overflow-y: auto; // 내용이 너무 많을 경우 스크롤 표시

  &::placeholder {
    color: #ccc;
  }
`;


/* ====== ‘응원하기’ 버튼 ====== */
export const SubmitButton = styled.button<{ $disabled?: boolean; $isMobile?: boolean; $isTablet?: boolean }>`
  width: ${({ $isMobile, $isTablet }) => 
    $isMobile ? '205px' : $isTablet ? '50%' : '397px'};
  margin: 0 auto;
  margin-top: ${({ $isMobile, $isTablet }) => 
    $isMobile ? '12px' : $isTablet ? '14px' : '16px'};
  padding: ${({ $isMobile, $isTablet }) => 
    $isMobile ? '8px 0' : $isTablet ? '10px 0' : '12px 0'};
  border: none;
  border-radius: 8px;

  color: #fff;
  font-size: ${({ $isMobile, $isTablet }) => 
    $isMobile ? '14px' : $isTablet ? '15px' : '16px'};
  font-family: "Pretendard Variable";
  font-weight: 600;
  background-color: ${({ $disabled }) => 
    $disabled ? '#ccc' : '#5CD282'};
  cursor: ${({ $disabled }) => 
    $disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s ease;
`;