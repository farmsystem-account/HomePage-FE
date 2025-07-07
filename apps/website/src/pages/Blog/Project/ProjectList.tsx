import { useState } from 'react';
import * as S from './ProjectList.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useProjectList } from '@/hooks/useProject';
import ProjectItem from './ProjectItem';
import { Track } from '@/models/blog';

import jumpArrow_left from '@/assets/Icons/pagenation_1.png';
import jumpArrow_right from '@/assets/Icons/pagenation_1.png';
import nextArrow_left from '@/assets/Icons/pagenation_2.png';
import nextArrow_right from '@/assets/Icons/pagenation_2.png';

/**
 * 드롭다운을 구분하기 위한 타입
 * - "grade" = 기수, "track" = 트랙
 */
type DropdownType = 'grade' | 'track' | '';

// 트랙 한글명을 Track enum으로 변환하는 함수
const convertTrackToEnum = (trackName: string): Track | undefined => {
  const trackMap: Record<string, Track> = {
    '전체': Track.ALL,
    'Union': Track.UNION,
    '빅데이터': Track.BIGDATA,
    '사물인터넷/로봇': Track.IOT_ROBOTICS,
    '인공지능': Track.AI,
    '보안/웹': Track.SECURITY_WEB,
    '게임/영상': Track.GAMING_VIDEO
  };
  return trackMap[trackName];
};

const ProjectList: React.FC = () => {
  const [openDropdown, setOpenDropdown] = useState<DropdownType>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedTrack, setSelectedTrack] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 12; // 12개씩 페이지네이션

  const { data: projects, pageInfo, loading, error } = useProjectList(
    selectedGrade ? parseInt(selectedGrade) : undefined,
    selectedTrack ? convertTrackToEnum(selectedTrack) : undefined,
    currentPage,
    pageSize
  );

  const { isTablet, isMobile, isBig } = useMediaQueries();

  const handleToggleDropdown = (type: DropdownType) => {
    setOpenDropdown(prev => (prev === type ? '' : type));
  };

  const handleSelectGrade = (grade: string) => {
    if (grade === '전체') {
      setSelectedGrade('전체');
      setOpenDropdown('');
      setCurrentPage(0);
      return; 
    }
    const gradeNumber = grade.replace('기', '');
    setSelectedGrade(gradeNumber);
    setOpenDropdown('');
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

  const handleSelectTrack = (track: string) => {
    setSelectedTrack(track);
    setOpenDropdown('');
    setCurrentPage(0); // 필터 변경 시 첫 페이지로 이동
  };

  // 페이지네이션 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (pageInfo && pageInfo.hasPreviousPage) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (pageInfo && pageInfo.hasNextPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 페이지 번호 배열 생성
  const generatePageNumbers = () => {
    if (!pageInfo) return [];
    
    const totalPages = pageInfo.totalPages;
    const current = pageInfo.currentPage;
    const pages: number[] = [];
    
    // 최대 7개의 페이지 번호만 표시
    const maxVisiblePages = 3;
    let startPage = Math.max(0, current - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
    
    // 시작 페이지 조정
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
      console.log("pages", pages);
    }
    
    return pages;
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>에러가 발생했습니다: {error.message}</div>;
  }

  return (
    <S.Container>
      <S.TableContainer $isTablet={isTablet} $isMobile={isMobile}>
        <S.FilterContainer>
        {/* 기수 필터 */}
        <S.FilterWrapper>
          <S.FilterGradeButton 
            onClick={() => handleToggleDropdown('grade')} 
            $isTablet={isTablet} 
            $isMobile={isMobile}
          >
            <a>{selectedGrade || '기수'}</a> <a>▾</a>
          </S.FilterGradeButton>
          {openDropdown === 'grade' && (
            <S.DropdownGradeMenu $isTablet={isTablet} $isMobile={isMobile}>
              {['전체','4기', '3기', '2기', '1기'].map((grade) => (
                <S.DropdownItem
                  key={grade}
                  onClick={() => handleSelectGrade(grade)}
                  $isTablet={isTablet} 
                  $isMobile={isMobile}
                >
                  {grade}
                </S.DropdownItem>
              ))}
            </S.DropdownGradeMenu>
          )}
        </S.FilterWrapper>

        {/* 트랙 필터 */}
        <S.FilterWrapper>
          <S.FilterTrackButton 
            onClick={() => handleToggleDropdown('track')} 
            $isTablet={isTablet} 
            $isMobile={isMobile}
          >
            <a>{selectedTrack || '트랙'}</a> <a>▾</a>
          </S.FilterTrackButton>
          {openDropdown === 'track' && (
            <S.DropdownTrackMenu $isTablet={isTablet} $isMobile={isMobile}>
              {['전체','Union', '빅데이터', '사물인터넷/로봇', '인공지능', '보안/웹', '게임/영상'].map(
                (track) => (
                  <S.DropdownItem
                    key={track}
                    onClick={() => handleSelectTrack(track)}
                    $isTablet={isTablet} 
                    $isMobile={isMobile}
                  >
                    {track}
                  </S.DropdownItem>
                )
              )}
            </S.DropdownTrackMenu>
          )}
        </S.FilterWrapper>
        </S.FilterContainer>
      </S.TableContainer>
      
      {/* 프로젝트 카드 리스트 */}
        {projects && projects.length > 0 ? (
          <>
            <S.ListContainer $isTablet={isTablet} $isBig={isBig} $isMobile={isMobile}>
              {projects.map((project) => (
                <ProjectItem
                  key={project.projectId}
                  projectId={project.projectId.toString()}
                  title={project.title}
                  description={project.introduction}
                  imageUrl={project.thumbnailImageUrl}
                  tags={[{
                    generation: [project.generation],
                    track: [project.track]
                  }]}
                />
              ))}
            </S.ListContainer>
            
            {/* 페이지네이션 */}
            {pageInfo && pageInfo.totalPages > 0 && (
              <S.PaginationContainer>
                <S.PaginationButton>
                  <S.PaginationButtonText
                    onClick={() => setCurrentPage(0)}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={jumpArrow_left} alt="jumpArrow" />
                  </S.PaginationButtonText>
                  <S.PaginationButtonText 
                    onClick={handlePreviousPage}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={nextArrow_left} alt="nextArrow" />
                  </S.PaginationButtonText>
                  
                  {generatePageNumbers().map((pageNum) => (
                    <S.PaginationPageButton
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      $active={pageNum === pageInfo.currentPage - 1}
                      $isMobile={isMobile}
                      $isTablet={isTablet}
                    >
                      {pageNum + 1}
                    </S.PaginationPageButton>
                  ))}
                  
                  <S.PaginationButtonText 
                    onClick={handleNextPage}
                    $disabled={!pageInfo.hasNextPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={nextArrow_right} alt="nextArrow_right" />
                  </S.PaginationButtonText>
                  <S.PaginationButtonText
                    onClick={() => setCurrentPage(pageInfo.totalPages - 1)}
                    $disabled={!pageInfo.hasPreviousPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    <img src={jumpArrow_right} alt="jumpArrow_right" />
                  </S.PaginationButtonText>
                </S.PaginationButton>
              </S.PaginationContainer>
            )}
          </>
        ) : (
          <S.TextContainer $isMobile={isMobile}>
            {selectedGrade || selectedTrack ? '선택한 필터에 맞는 프로젝트가 없어요.' : '아직 등록된 글이 없어요.'}
            <a>파밍로그를 통해 프로젝트를 등록해보세요!</a>
          </S.TextContainer>
        )}
    </S.Container>
  );
};

export default ProjectList;

