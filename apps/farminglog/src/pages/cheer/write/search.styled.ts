import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

/** 전체 컨테이너 */
export const SearchContainer = styled.div<ResponsiveProps>`
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
  align-items: center;
  margin: 0 auto;

  background-color: #f8fdf8;
  padding-bottom: 50px;
`;

/** 헤더(응원하기, 뒤로가기 버튼) */
export const SearchHeader = styled.div<ResponsiveProps>`
  width: 100%;
  height: ${({ $isApp }) => ($isApp ? '40px' : '80px')};
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  align-items: center;

  background: #fcfcfc;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
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

export const SearchTitle = styled.h1<ResponsiveProps>`
  grid-column: 2;
  color: #2e2e2e;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) =>
    $isApp ? '20px' : $isMobile ? '28px' : '36px'};
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.24px;
`;

/** "회원 찾기" 문구 */
export const Title = styled.h2`
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 700;
  color: #333;
`;

/** 검색창 + 결과를 묶는 래퍼 */
export const SearchWrapper = styled.div`
  width: 80%;
  max-width: 900px;
  position: relative; 
`;

/** 검색창 (둥근 모서리) */
export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 60px;
  padding: 0 16px;

  border: 3px solid #2cd282;
  border-radius: 50px;
  background-color: #fff;

  position: relative;
  z-index: 1;
`;

export const SearchInput = styled.input`
  flex: 1;
  margin-right: 8px;
  border: none;
  outline: none;
  background: transparent;

  font-size: 16px;
  color: #333;

  &::placeholder {
    color: #ccc;
  }
`;

export const SearchButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 50px;
  height: 50px;
  border: none;
  background: transparent;
  cursor: pointer;

  &:hover {
    background-color: #eaf9ea;
  }
`;

/** 드롭다운 (검색창과 동일 폭) */
export const ResultsList = styled.ul`
  position: absolute;
  top: 60px;   /* 검색창 높이 만큼 내려놓기 */
  left: 0;
  right: 0;   /* 폭을 SearchBar와 동일하게 */

  max-height: 300px;
  overflow-y: auto;
  margin: 0;
  padding: 0;
  list-style: none;

  background-color: #fff;
  border-top: none; 
  border: 2px solid #DBDBDB;

  /* 검색창 아래와 자연스럽게 이어지도록 살짝 겹침 */
  margin-top: 3px;
  z-index: 0;
`;

/** 결과 아이템 (아이콘 + 텍스트 2줄) */
export const ResultItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f2f2;
  }

  /* 위 아래 구분선 */
  & + & {
    border-top: 1px solid #eee;
  }
`;

/** 아이콘 영역 (원 안에 로고 등) */
export const ItemIconWrapper = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fcfcfc;

  img {
    width: 24px;
    height: 24px;
  }
`;

/** 텍스트 영역 (이름 + 하단 소속) */
export const ItemTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  .name {
    font-size: 16px;
    font-weight: 600;
    color: #2e2e2e;
    margin-bottom: 4px;
  }
  .sub {
    font-size: 14px;
    font-weight: 400;
    color: #888;
  }
`;
