import styled from 'styled-components';

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

/** 전체 컨테이너 */
export const SearchContainer = styled.div<ResponsiveProps>`
  max-width: ${({ 
    $isMobile, 
    $isTablet, $isDesktop 
  }) => ($isMobile ? '290px' : $isTablet ? '90%' : $isDesktop ? '1000px' : '1000px')};
  width: 100%;
  height: 80vh; 
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
`;

/** 헤더(응원하기, 뒤로가기 버튼) */
export const SearchHeader = styled.div<ResponsiveProps>`
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
  font-size: ${({ $isMobile }) => ($isMobile ? '16px' : '36px')};
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.24px;
`;

/** "회원 찾기" 문구 */
export const Title = styled.h2<ResponsiveProps>`
  margin-top: 60px;
  margin-bottom: 30px;
  font-size: ${({ $isMobile }) => ($isMobile ? '15px' : '35px')};
  font-weight: 700;
  color: #191919;
  font-family: "Pretendard Variable";
  text-align: center;

  p {
    display: inline;
    color: #2cd282;
    white-space: nowrap;
    font-size: ${({ $isMobile }) => ($isMobile ? '20px' : '43px')};

  }
`;
/** 검색창 + 결과를 묶는 래퍼 */
export const SearchWrapper = styled.div`
  width: 80%;
  max-width: 900px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

/** 검색창 (둥근 모서리) */
export const SearchBar = styled.div<ResponsiveProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: ${({ $isMobile, $isTablet, $isDesktop }) =>
    $isMobile ? '230px' : $isTablet ? '80%' : $isDesktop ? '930px' : '930px'};
  height: ${({ $isMobile }) => ($isMobile ? '45px' : '60px')};
  padding: ${({ $isMobile }) => ($isMobile ? '0 10px' : '0 16px')};

  border: 3px solid #2cd282;
  border-radius: 50px;
  background-color: #fff;

  position: relative;
  z-index: 1;
`;

export const SearchInput = styled.input<ResponsiveProps>`
  flex: 1;
  margin-right: 8px;
  border: none;
  outline: none;
  background: transparent;

  font-size: ${({ $isMobile }) => ($isMobile ? '10px' : '16px')};
  font-family: "Pretendard Variable";
  height: ${({ $isMobile }) => ($isMobile ? '40px' : '60px')};
  padding: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};
  color: #333;

  &::placeholder {
    font-size: ${({ $isMobile }) => ($isMobile ? '9px' : '14px')};
    font-family: "Pretendard Variable";
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
`;

/** 드롭다운 (검색창과 동일 폭) */
export const ResultsList = styled.ul<ResponsiveProps>`
  position: absolute;
  top: ${({ $isMobile }) => ($isMobile ? '40px' : '55px')}; /* 검색창 높이 만큼 내려놓기 */
  width: ${({ $isMobile, $isTablet, $isDesktop }) =>
    $isMobile ? '200px' : $isTablet ? '73%' : $isDesktop ? '890px' : '890px'};
  max-height: ${({ $isMobile }) => ($isMobile ? '150px' : '200px')}; /* 최대 5개의 아이템 (60px * 5) */
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
export const ResultItem = styled.li<ResponsiveProps>`
  display: flex;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '8px' : '12px')};

  padding: ${({ $isMobile }) => ($isMobile ? '8px 12px' : '12px 16px')};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f2f2f2;
  }

  /* 위 아래 구분선 */
  & + & {
    border-top: 1px solid #eee;
  }

  .name {
    font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
    font-weight: 600;
    color: #2e2e2e;
    margin-bottom: ${({ $isMobile }) => ($isMobile ? '2px' : '4px')};
  }

  .sub {
    font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '14px')};
    font-weight: 400;
    color: #888;
  }
`;

/** 아이콘 영역 (원 안에 로고 등) */
export const ItemIconWrapper = styled.div<ResponsiveProps>`
  width: ${({ $isMobile }) => ($isMobile ? '30px' : '40px')};
  height: ${({ $isMobile }) => ($isMobile ? '30px' : '40px')};
  flex-shrink: 0;

  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #fcfcfc;
  border: 2px solid #2cd282;

  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
  }
`;

/** 텍스트 영역 (이름 + 하단 소속) */
export const ItemTextWrapper = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;

  .name {
    font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
    font-weight: 600;
    color: #2e2e2e;
    margin-bottom: ${({ $isMobile }) => ($isMobile ? '2px' : '4px')};
  }

  .sub {
    font-size: ${({ $isMobile }) => ($isMobile ? '12px' : '14px')};
    font-weight: 400;
    color: #888;
  }
`;
