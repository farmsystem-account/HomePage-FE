import styled from "styled-components";

// 타이틀
export const CheerTitle = styled.h2`
  font-size: 36px;
  font-weight: 600;
  margin-bottom: 24px;
`;

// 스크롤 영역 (카드들을 가로 스크롤)
export const CheerCardWrapper = styled.div<{
  $isMobile: boolean;
  $isTablet: boolean;
}>`
  max-width: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "240px" : $isTablet ? "80%" : "1100px"};
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: ${({ $isMobile, $isTablet }) =>
    $isMobile ? "10px" : $isTablet ? "20px" : "30px"};

  /* 스크롤바 커스텀 (크롬 등 웹킷 브라우저 기준) */
  &::-webkit-scrollbar {
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`;

// 개별 카드
export const CheerCard = styled.div<{
  bgColor?: string;
  $isMobile: boolean;
  $isExpanded?: boolean;
}>`
  transition: transform 0.3s ease, height 0.3s ease;
  transform: ${({ $isExpanded }) => ($isExpanded ? "scale(1.08)" : "scale(1)")};
  height: ${({ $isMobile, $isExpanded }) =>
    $isMobile
      ? $isExpanded
        ? "300px" // 모바일 확대 시
        : "150px"
      : $isExpanded
        ? "400px" // 데스크탑/태블릿 확대 시
        : "280px"};

  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  border-radius: 10px;
  width: ${({ $isMobile }) => ($isMobile ? "240px" : "420px")};
  box-shadow: ${({ $isExpanded }) =>
    $isExpanded
      ? "0 8px 16px rgba(0, 0, 0, 0.2)"
      : "0 2px 4px rgba(0, 0, 0, 0.1)"};
  flex-shrink: 0;
  overflow: hidden;
  padding: 16px;
`;


/** 상단: 수신자/카테고리 영역 */
export const CheerHeader = styled.div<{$isMobile: boolean;}>`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

/** 아바타 (원형) -> 실제 이미지 표시 */
export const CheerAvatar = styled.img<{$isMobile: boolean;}>`
  width: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  height: ${({ $isMobile }) => ($isMobile ? "20px" : "40px")};
  border-radius: 50%;
  object-fit: cover; /* 이미지가 잘리는 경우 대비 */
  margin-right: 8px;
  background-color: #E5E5E5;
`;

/** 상단 텍스트 */
export const CheerReceiverText = styled.span<{$isMobile: boolean;}>`
  font-family: "Pretendard Variable";
  font-weight: 400;
  font-size: ${({ $isMobile }) => ($isMobile ? "10px" : "16px")};
  a{
    font-size: ${({ $isMobile }) => ($isMobile ? "12px" : "24px")};
    font-weight: 700;
  }
`;

/** 중단 */
export const CheerContent = styled.div<{
  $isMobile: boolean;
  $isExpanded?: boolean;
}>`
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "12px" : "20px")};
  color: #333;
  ${({ $isExpanded, $isMobile }) =>
    !$isExpanded &&
    `
    display: -webkit-box;
    -webkit-line-clamp: ${$isMobile ? 2 : 3};
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;`}
`;

/** 하단: 발신자 */
export const CheerFooter = styled.div<{$isMobile: boolean;}>`
  font-size: ${({ $isMobile }) => ($isMobile ? "10px" : "16px")};
  font-weight: 500;
  font-family: "Pretendard Variable";
  color: #999;
  text-align: center;

  align-items: center;
  display: flex;
  justify-content: flex-end;
  a {
    font-size: ${({ $isMobile }) => ($isMobile ? "10px" : "16px")};
    font-weight: 600;
    font-family: "Pretendard Variable";
  }
`;

export const CheerColorText = styled.span<{ categoryColor?: string, $isMobile: boolean; }>`
  font-weight: 700;
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "12px" : "20px")};
  color: ${({ categoryColor }) => categoryColor || "#333"};
`;
