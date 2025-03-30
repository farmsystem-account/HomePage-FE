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
  padding-top: 30px;
  padding-bottom: 30px;

  background: white;
  border-radius: 3px;
`;

// 타이틀
export const CheerTitle = styled.h2<{$isMobile: boolean;}>`
  font-size: ${({ $isMobile}) => $isMobile ? "24px" : "36px" }
  font-weight: 600;
  font-family: "Pretendard Variable";
  margin-bottom: 24px;
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
}>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  border-radius: 10px;
  width: ${({ $isMobile }) => ($isMobile ? "280px" : "400px")};
  height: ${({ $isMobile }) => ($isMobile ? "200px" : "300px")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
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
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover; /* 이미지가 잘리는 경우 대비 */
  margin-right: 8px;
  background-color: #E5E5E5;
`;

/** 상단 텍스트 */
export const CheerReceiverText = styled.span<{$isMobile: boolean;}>`
  font-weight: 400;
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "18px")};
  font-family: "Pretendard Variable";
  a{
    font-size: ${({ $isMobile }) => ($isMobile ? "18px" : "24px")};
    font-weight: 700;
    font-family: "Pretendard Variable";
  }
`;

/** 중단 */
export const CheerContent = styled.div<{$isMobile: boolean;}>`
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "16px")};
  font-family: "Pretendard Variable";
  color: #333;
  margin: ${({ $isMobile }) => ($isMobile ? "20px auto" : "50px auto")};

  /* 3줄까지만 표시, 나머지는 ellipsis(...) 처리 */
  display: -webkit-box;
  -webkit-line-clamp: ${({ $isMobile }) => ($isMobile ? "2" : "3")};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** 하단: 발신자 */
export const CheerFooter = styled.div<{$isMobile: boolean;}>`
  font-size: 16px;
  font-family: "Pretendard Variable";
  font-weight: 500;
  color: #999;
  text-align: center;

  align-items: center;
  display: flex;
  justify-content: flex-end;
  a{
    font-size: 16px;
    font-weight: 600;
    font-family: "Pretendard Variable";
  }
`;

export const CheerColorText = styled.span<{ categoryColor?: string, $isMobile: boolean; }>`
  font-weight: 700;
  font-family: "Pretendard Variable";
  font-size: ${({ $isMobile }) => ($isMobile ? "18px" : "24px")};
  color: ${({ categoryColor }) => categoryColor || "#333"};
`;
