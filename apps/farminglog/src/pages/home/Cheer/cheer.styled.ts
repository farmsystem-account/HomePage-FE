import styled from "styled-components";

// 전체 컨테이너
export const CheerContainer = styled.div<{ $isMobile: boolean, $isTablet: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center; /* 가운데 정렬 */
  
  width: 100%;
  max-width: ${({ $isMobile,$isTablet }) => ($isMobile ? "90%" : $isTablet ? "90%" : "1200px")};
  margin: 0 auto;
  padding-top: 30px;
  padding-bottom: 30px;

  background: white;
`;

// 타이틀
export const CheerTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 24px;
`;

// 스크롤 영역 (카드들을 가로 스크롤)
export const CheerCardWrapper = styled.div<{ $isMobile: boolean, $isTablet: boolean }>`
  max-width: ${({ $isMobile,$isTablet }) => ($isMobile ? "80%" : $isTablet ? "80%" : "1100px")};
  overflow-x: auto;
  overflow-y: hidden;
  display: flex;
  gap: ${({ $isMobile,$isTablet }) => ($isMobile ? "10px": $isTablet ? "20px" : "30px")};

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
export const CheerCard = styled.div<{ bgColor?: string, $isMobile: boolean }>`
  /* 세로 배치 */
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* 상단-중단-하단 간격 분배 */

  background-color: ${({ bgColor }) => bgColor || "#ffffff"};
  border-radius: 8px;
  width: ${({ $isMobile }) => ($isMobile ? "320px" : "400px")};   /* 카드 너비 고정 */
  height: ${({ $isMobile }) => ($isMobile ? "240px" : "300px")};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-shrink: 0;

  /* 카드 내부 내용이 넘칠 경우 숨김 처리 */
  overflow: hidden;
  padding: 16px;
`;

/** 상단: 칭찬받는 사람 + 아바타 등 */
export const CheerHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

/** 아바타 (원형) */
export const CheerAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 8px;
`;

/** 상단: '이소은 님에게 칭찬해요!' 텍스트 */
export const CheerReceiverText = styled.span`
  font-weight: bold;
  
  font-size: 1rem;
`;

/** 중단: 칭찬 본문 */
export const CheerContent = styled.div`
  /* 남은 공간을 유연하게 채우도록 */
  flex: display;
  flex-basis: 200px;
  item-align: center;
  
  font-size: 0.9rem;
  color: #333;
  margin-bottom: 8px;
  margin: 60px auto;

  /* 3줄까지만 표시, 나머지는 ellipsis(...) 처리 */
  display: -webkit-box;
  -webkit-line-clamp: 3; 
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

/** 하단: 칭찬하는 사람 (우측 정렬) */
export const CheerFooter = styled.div`
  font-size: 0.8rem;
  color: #999;
  text-align: right;
`;
