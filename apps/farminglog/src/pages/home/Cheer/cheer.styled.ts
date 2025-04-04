import styled from "styled-components";

// 전체 컨테이너
export const CheerContainer = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */

  width: 100%;
  max-width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "90%" : $isTablet ? "90%" : "1200px"};
  margin: 0 auto;
  padding-top: 10px;
  padding-bottom: 30px;

  background: white;
  border-radius: ${({ $isMobile }) => ($isMobile ? '3px' : '10px')};
`;
/** 랭킹 코드의 TitleBox 스타일을 참고해 동일한 구조로 적용 */
export const TitleBox = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  width: 100%;
  background-color: white;
  padding: 16px 0;
  box-sizing: border-box;

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 2;
  border-radius: ${({ $isMobile }) => ($isMobile ? '3px' : '10px')};
`;

/** 랭킹 코드의 Title 스타일 */
export const Title = styled.h2<{ $isMobile: boolean }>`
  font-size: ${({ $isMobile }) => ($isMobile ? "24px" : "36px")};
  font-weight: 600;
  font-family: "Pretendard Variable";
  margin: 0;
`;

/** 랭킹 코드의 BackArrow 스타일 */
export const BackArrow = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? '24px' : '35px')};
  position: absolute;
  right: 16px;
  top: 16px;
  cursor: pointer;
`;

// 스크롤 영역 (카드들을 가로 스크롤)
export const CheerCardWrapper = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  max-width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "80%" : $isTablet ? "80%" : "1100px"};
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "10px" : $isTablet ? "20px" : "30px"};

  /* 스크롤바 커스텀 (크롬 등 웹킷 브라우저 기준) */
  &::-webkit-scrollbar {
    height: 8px;
    border-radius: 9999px; /* 스크롤바 둥근 모양 */
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 9999px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 9999px;
  }
`;

// 개별 카드
export const CheerCard = styled.div<{
  bgColor?: string;
  $isMobile: boolean;
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  border-radius: 10px;
  width: ${({ $isMobile }) => ($isMobile ? "240px" : "400px")};
  height: ${({ $isMobile }) => ($isMobile ? "180px" : "300px")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;
  overflow: hidden;
  padding: 16px;
`;

/** 상단: 수신자/카테고리 영역 */
export const CheerHeader = styled.div<{ $isMobile: boolean }>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

/** 아바타 (원형) -> 실제 이미지 표시 */
export const CheerAvatar = styled.img<{ $isMobile: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover; /* 이미지가 잘리는 경우 대비 */
  margin-right: 8px;
  background-color: #e5e5e5;
`;

/** 상단 텍스트 */
export const CheerReceiverText = styled.span<{ $isMobile: boolean }>`
  font-weight: 400;
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "18px")};
  font-family: "Pretendard Variable";
  a {
    font-size: ${({ $isMobile }) => ($isMobile ? "18px" : "24px")};
    font-weight: 700;
    font-family: "Pretendard Variable";
  }
`;

/** 중단 */
export const CheerContent = styled.div<{ $isMobile: boolean }>`
  /* 기존 속성 */
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "16px")};
  font-family: "Pretendard Variable";
  color: #333;
  margin: ${({ $isMobile }) => ($isMobile ? "20px auto" : "50px auto")};
  padding: 0 20px;

  /* 말줄임 & 3줄 제한 & 가운데 정렬 */
  text-align: center;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* 최대 3줄 */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  line-height: 1.2;
  height: 3.6em; /* 3줄 * line-height(1.2) = 3.6em */
  word-wrap: break-word;
  white-space: normal;
`;

/** 하단: 발신자 */
export const CheerFooter = styled.div<{ $isMobile: boolean }>`
  font-size: 16px;
  font-family: "Pretendard Variable";
  font-weight: 500;
  color: #999;
  text-align: center;

  align-items: center;
  display: flex;
  justify-content: flex-end;
  a {
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard Variable";
  }
`;

/** 강조 텍스트 (카테고리 색상 적용) */
export const CheerColorText = styled.span<{
  $categoryColor?: string;
  $isMobile: boolean;
}>`
  font-weight: 700;
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "18px" : "24px")};
  color: ${({ $categoryColor }) => $categoryColor || "#333"};
`;