import {useEffect, useState } from 'react';
import * as S from './index.styled';
import Card from './Card';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import WhiteContentContainer from '@/layouts/WhiteContentContainer';
import { useFarmingLogQuery } from '@/services/query/useFarmingLogInQuery';
import useFarmingLogStore from '@/stores/farminglogStore';
import CardSkeleton from './CardSkeleton';


import jumpArrow_left from '@/assets/Icons/pagenation_1.png';
import jumpArrow_right from '@/assets/Icons/pagenation_1.png';
import nextArrow_left from '@/assets/Icons/pagenation_2.png';
import nextArrow_right from '@/assets/Icons/pagenation_2.png';

import EditImage from '@/assets/Icons/edit-3.png';

export default function View() {
  const navigate = useNavigate();
  const { isApp, isMobile, isDesktop, isTablet } = useMediaQueries();
  const [currentPage, setCurrentPage] = useState<number>(0);
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const {
    data,
    isLoading,
    error,
    refetch
  } = useFarmingLogQuery(currentPage, 10); // 10개씩 페이지네이션
  const { isNeedRefresh, setIsNeedRefresh } = useFarmingLogStore();

  useEffect(() => {
    if (isNeedRefresh) {
      refetch();
      setIsNeedRefresh(false);
    }
  }, [isNeedRefresh, refetch, setIsNeedRefresh]);


  // 페이지 번호 배열 생성
  const generatePageNumbers = () => {
    if (!data) return [];
      
    const totalPages = data.totalPages;
    const current = data.number; // 현재 페이지 번호 (0시작)
    const pages: number[] = [];
      
    // 최대 5개의 페이지 번호만 표시
    const maxVisiblePages = 5;
    let startPage = Math.max(0, current - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);
      
    // 시작 페이지 조정
    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }
      
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
      
    return pages;
  };

  // 페이지네이션 핸들러
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handleScrollTop(); //위로 올라가라잇
  };

  const handlePreviousPage = () => {
    if (data && !data.first) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data && !data.last) {
      setCurrentPage(currentPage + 1);
    }
  };

  // 로딩 또는 에러 상태 처리
  if (isLoading) return (
    <WhiteContentContainer
      title="파밍로그"
      isContentHeaderShown={true}
    >
      <S.FarmingLogCardContainer
        $isApp={isApp}
        $isMobile={isMobile}
        $isDesktop={isDesktop}
      >
        {Array.from({ length: 10 }, (_, index) => (
          <CardSkeleton key={index} />
        ))}
      </S.FarmingLogCardContainer>
    </WhiteContentContainer>
  );
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <WhiteContentContainer
      title="파밍로그"
      isContentHeaderShown={true}
      >
        <S.FarmingLogCardContainer
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
        >
          {data?.content.map((log) => (
            <div key={log.farmingLogId}>
              <Card data={log} />
            </div>
          ))}
          {/* 페이지네이션 */}
          {data && data.content.length > 0 && (
            <S.PaginationContainer>
              <S.PaginationButton>
                <S.PaginationButtonText
                  onClick={() => setCurrentPage(0)}
                  $disabled={data?.first}
                  $isMobile={isMobile}
                  $isTablet={isTablet}
                >
                  <img src={jumpArrow_left} alt="jumpArrow" />
                </S.PaginationButtonText>
                <S.PaginationButtonText 
                  onClick={handlePreviousPage}
                  $disabled={data?.first}
                  $isMobile={isMobile}
                  $isTablet={isTablet}
                >
                  <img src={nextArrow_left} alt="nextArrow" />
                </S.PaginationButtonText>
                
                {generatePageNumbers().map((pageNum) => (
                  <S.PaginationPageButton
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    $active={pageNum === currentPage}
                    $isMobile={isMobile}
                    $isTablet={isTablet}
                  >
                    {pageNum + 1}
                  </S.PaginationPageButton>
                ))}
                
                <S.PaginationButtonText 
                  onClick={handleNextPage}
                  $disabled={data?.last}
                  $isMobile={isMobile}
                  $isTablet={isTablet}
                >
                  <img src={nextArrow_right} alt="nextArrow_right" />
                </S.PaginationButtonText>
                <S.PaginationButtonText
                  onClick={() => setCurrentPage(data.totalPages - 1)}
                  $disabled={data?.last}
                  $isMobile={isMobile}
                  $isTablet={isTablet}
                >
                  <img src={jumpArrow_right} alt="jumpArrow_right" />
                </S.PaginationButtonText>
                </S.PaginationButton>
              </S.PaginationContainer>
            )}
        </S.FarmingLogCardContainer>
        <S.FarmingLogWriteButton
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
          onClick={() => navigate('/farminglog/create')}
        >
          <S.FarmingLogWriteButtonImage
            $isApp={isApp}
            $isMobile={isMobile}
            $isDesktop={isDesktop}
            src={EditImage}
            alt="글쓰기"
          />
        </S.FarmingLogWriteButton>
    </WhiteContentContainer>
  );
}
