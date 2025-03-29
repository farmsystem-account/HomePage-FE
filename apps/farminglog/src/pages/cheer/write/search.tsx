import { useState } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries'; 
import * as S from './search.styled';
import GoBackImage from '@/assets/Icons/corner-up-left.png'; 
import searchIcon from '../../../assets/Icons/search_icon.png';
import profileIcon from '@/assets/Icons/Seed.png';

/** 검색 결과 항목 예시 인터페이스 */
interface UserInfo {
  name: string;
  generation: string; // ex) "3기 보안/웹"
  icon?: string;      // 아이콘 경로(없으면 기본)
}

interface SearchProps {
  onSelectUser: (username: string) => void; 
}

/**
 * 검색 컴포넌트 
 * - 헤더(“응원하기” + 뒤로가기)
 * - “회원 찾기” 타이틀
 * - 검색창 (녹색 라운드 테두리)
 * - 드롭다운 형태의 검색 결과 목록
 */
export default function Search({ onSelectUser }: SearchProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserInfo[]>([]);

  /** 반응형 훅 */
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();

  /** 가짜 검색 로직 */
  const handleSearch = () => {
    // 가령 서버에서 [ { name, generation, icon }, ... ] 형태로 받아온다고 가정
    const mockData: UserInfo[] = [
      { name: '이소은', generation: '4기 보안/웹', icon: profileIcon },
      { name: '팜하니', generation: '4기 운영/기획', icon: profileIcon },
      { name: '김수빈', generation: '4기 보안/웹', icon: profileIcon },
      { name: '송윤석', generation: '4기 보안/웹', icon: profileIcon },
      { name: '백동민', generation: '4기 보안/웹', icon: profileIcon },
      { name: '박주형', generation: '4기 사물인터넷' },
    ];

    // 검색어(query)가 name에 포함되면 필터링
    const filtered = mockData.filter((user) => user.name.includes(query));
    setResults(filtered);
  };

  /** 검색 결과 아이템 클릭 시 */
  const handleSelectItem = (user: UserInfo) => {
    // 상위에 선택된 유저의 이름(또는 UserInfo 전체)을 전달
    onSelectUser(user.name);
  };

  return (
    <S.SearchContainer
      $isApp={isApp}
      $isMobile={isMobile}
      $isTablet={isTablet}
      $isDesktop={isDesktop}
    >
      {/* 상단 헤더 */}
      <S.SearchHeader
        $isApp={isApp}
        $isMobile={isMobile}
        $isDesktop={isDesktop}
      >
        <S.GoBackButton 
          $isApp={isApp} 
          $isMobile={isMobile} 
          $isDesktop={isDesktop}
          onClick={() => window.history.back()}
        >
          <img src={GoBackImage} alt="뒤로가기" />
        </S.GoBackButton>

        <S.SearchTitle
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
        >
          응원하기
        </S.SearchTitle>
      </S.SearchHeader>

      {/* 중간 “회원 찾기” 타이틀 */}
      <S.Title>회원 찾기</S.Title>

      {/** 검색창 + 결과 드롭다운 래퍼 */}
      <S.SearchWrapper>
        {/* 검색창 */}
        <S.SearchBar>
          <S.SearchInput
            type="text"
            value={query}
            placeholder="응원할 회원의 이름을 입력해 주세요"
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <S.SearchButton onClick={handleSearch}>
            <img 
              src={searchIcon}
              alt="search"
              style={{
                width: isMobile ? '25px' : '50px',
                height: isMobile ? '25px' : '50px'
              }}
            />
          </S.SearchButton>
        </S.SearchBar>

        {/* 검색 결과 드롭다운 (검색창과 폭 동일) */}
        {results.length > 0 && (
          <S.ResultsList>
            {results.map((user) => (
              <S.ResultItem key={user.name} onClick={() => handleSelectItem(user)}>
                <S.ItemIconWrapper>
                  {user.icon ? (
                    <img src={user.icon} alt="icon" />
                  ) : (
                    <img src="/images/icon_leaf.png" alt="default icon" />
                  )}
                </S.ItemIconWrapper>
                <S.ItemTextWrapper>
                  <span className="name">{user.name}</span>
                  <span className="sub">{user.generation}</span>
                </S.ItemTextWrapper>
              </S.ResultItem>
            ))}
          </S.ResultsList>
        )}
      </S.SearchWrapper>
    </S.SearchContainer>
  );
}
