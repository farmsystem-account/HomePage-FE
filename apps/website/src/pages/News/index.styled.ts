import styled from 'styled-components';

export const Container = styled.div`
  padding: 100px 20px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;

  width: 100%;
  min-height: 100vh;
  position: relative;
  overflow-y: auto;
`;

export const NewsPageTitle = styled.h2`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  color: var(--FarmSystem_Green01, #28723F);
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: 40px; /* 100% */

  padding: 10px 0;
  width: 100%;
  max-width: 1000px;
`;

export const DescriptionContainer = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  padding: 20px;
`;

export const Message = styled.div<{$isMobile: boolean;}>`
  padding-top: 20vh;
  height: 100px;
  display: flex;
  justify-content: center;
  text-align: center;
  flex-direction: column;
  color: black;
  font-size: ${(props) => (props.$isMobile ? "20px" : "32px")};
  font-weight: 600;
  margin-bottom: 35px; 
`;

export const MiniMessage = styled.p<{$isMobile: boolean;}>`
  font-size: ${(props) => (props.$isMobile ? "10px" : "14px")};
  font-weight: 400;
  margin-top: 10px;
`;

export const NewsContainer = styled.div`
  display: flex;
  min-height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 40px;

  margin-top: 70px;
`;

export const Line = styled.hr`
  width: 100%;
  height: 2px;
  background-color: var(--FarmSystem_Green01, #28723F);
  border: none;
  
  padding: 0 20px;
  width: 100%;
  max-width: 1100px;
  margin: 30px 0;
`;


/** 페이지네이션 컨테이너 */
export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

/** 페이지네이션 버튼 컨테이너 */
export const PaginationButton = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

/** 페이지네이션 버튼 텍스트 */
export const PaginationButtonText = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  border-radius: 6px;
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;

  /* 사이즈 조절 */
  img[alt="nextArrow"]{
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    margin-right: 10px;
  }

  img[alt="jumpArrow"]{
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
  }

  /* nextArrow 이미지 회전 */
  img[alt="nextArrow_right"] {
    width: ${(props) => (props.$isMobile ? '6px' : props.$isTablet ? '12px' : '15px')};
    height: ${(props) => (props.$isMobile ? '12px' : props.$isTablet ? '24px' : '30px')};
    transform: rotate(180deg);
    margin-left: 10px;
  }

  img[alt="jumpArrow_right"] {
    width: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    height: ${(props) => (props.$isMobile ? '24px' : props.$isTablet ? '48px' : '60px')};
    transform: rotate(180deg);
  }
  
  &:hover {
    ${(props) => !props.$disabled && `
      background-color: ${props.$active ? 'var(--FarmSystem_Green06)' : '#f0f0f0'};
      transform: translateY(-1px);
    `}
  }
  
  &:active {
    ${(props) => !props.$disabled && `
      transform: translateY(0);
    `}
  }
`;

export const PaginationPageButton = styled.span<{
  $active?: boolean;
  $disabled?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
}>`
  width: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  height: ${(props) => (props.$isMobile ? '20px' : props.$isTablet ? '26px' : '40px')};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: ${(props) => (props.$isMobile ? '10px' : props.$isTablet ? '13px' : '20px')};
  cursor: ${(props) => (props.$disabled ? 'not-allowed' : 'pointer')};

  background-color: ${(props) => (props.$active ? 'var(--FarmSystem_Green06)' : 'var(--FarmSystem_DarkGrey)')};
  color: white;
  font-size: ${(props) => (props.$isMobile ? '8px' : props.$isTablet ? '12px' : '14px')};
  font-weight: 500;
  transition: all 0.2s ease;
`;


