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
  width: ${({ $isApp, $isMobile, $isTablet, $isDesktop }) =>
    $isApp
      ? '290px'
      : $isMobile
      ? '400px'
      : $isTablet
      ? '780px'
      : $isDesktop
      ? '1000px'
      : '1200px'};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: ${({ $isApp }) => ($isApp ? '0px' : '40px')};

  border-radius: 5px;
  background: #fcfcfc;
  margin: 0 auto;

  /* 앱인 경우 padding을 추가로 주고 싶다면 */
  padding: ${({ $isMobile }) => ($isMobile ? '20px 15px 0px 15px' : '')};
`;

/* ====== 헤더 ====== */
export const CheerContainerHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  ${({ $isMobile }) =>
    !$isMobile &&
    `
    background: #FCFCFC;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  `}
`;

export const CheerContainerTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2e2e2e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' : $isMobile ? '28px' : '36px'};
  font-style: normal;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button<ResponsiveProps>`
  grid-column: 1;
  width: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  height: ${({ $isApp }) => ($isApp ? '24px' : '35px')};
  margin-left: ${({ $isApp }) => ($isApp ? '0px' : '25px')};

  border: none;
  background: none;
  cursor: pointer;
`;

/* 작은 서브타이틀 */
export const HeaderText = styled.h3<ResponsiveProps>`
  color: #2e2e2e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp }) => ($isApp ? '10px' : '20px')};
  font-weight: 500;
  line-height: ${({ $isApp }) => ($isApp ? '16px' : '24px')};
  margin-top: ${({ $isApp }) => ($isApp ? '5px' : '23px')};
  letter-spacing: -0.24px;
`;

/* 메인 타이틀 */
export const MainTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-family: "Pretendard Variable";
  font-weight: 700;
  color: #2e2e2e;
`;

/* ====== 카드 영역 ====== */
export const CheerCard = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: ${({ $isApp, $isMobile }) =>
    $isApp ? '260px' : $isMobile ? '420px' : '700px'};
  padding: ${({ $isApp }) => ($isApp ? '10px 5px' : '20px 10px')};
`;

/* 카드 안의 내용 래핑 */
export const ContentWrapper = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  padding: 10px 5px;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '30px')};
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

  width: ${({ $isApp }) => ($isApp ? '50px' : '90px')};
  text-align: center;
  padding: ${({ $isApp }) => ($isApp ? '2px 4px' : '10px 15px')};
  border-radius: ${({ $isApp }) => ($isApp ? '10px' : '20px')};
  cursor: pointer;

  /* 선택된 버튼은 어두운 배경, 미선택은 기본 초록 */
  background-color: ${({ $bgColor }) => $bgColor || '#fcfcfc'};
  /* 폰트 색상은 props로 받되, 기본은 흰색 */
  color: ${({ $fontColor }) => $fontColor || '#FFFFFF'};

  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '10px' : $isMobile ? '12px' : '15px'};
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
  width: 100%;
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
  height: 100px;
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

  &::placeholder {
    color: #ccc;
  }
`;

/* ====== ‘응원하기’ 버튼 ====== */
export const SubmitButton = styled.button<{ $disabled?: boolean }>`
  width: 50%;
  margin: 0 auto;
  margin-top: 16px;
  padding: 12px 0;
  border: none;
  border-radius: 8px;

  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background-color: ${({ $disabled }) => ($disabled ? '#ccc' : '#5CD282')};
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.2s ease;
`;