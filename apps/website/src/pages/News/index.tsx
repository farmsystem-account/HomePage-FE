import { useState, useEffect } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useNewsList } from '@/hooks/useNews';
// import Logger from '@/utils/Logger';
import * as S from './index.styled';
import NewsItem from './NewsItem';

import jumpArrow_left from '@/assets/Icons/pagenation_1.png';
import jumpArrow_right from '@/assets/Icons/pagenation_1.png';
import nextArrow_left from '@/assets/Icons/pagenation_2.png';
import nextArrow_right from '@/assets/Icons/pagenation_2.png';


export default function News() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 12; // 12개씩 페이지네이션
  const { isMobile } = useMediaQueries();
  const { data: newsData, loading: newsLoading, error: newsError } = useNewsList();
  const newsDataSorted = newsData?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  const totalPages = Math.ceil(newsDataSorted?.length / pageSize);

  const currentNews = newsDataSorted?.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  const handlePreviousPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  // 페이지 번호 배열 생성
  const generatePageNumbers = () => {
    const pages: number[] = [];
    const maxVisiblePages = 3;
    let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  // 페이지 전환시 스크롤을 맨위로 부드럽게 전환
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (newsLoading) {
    return (
      <S.SkeletonContainer>
        <S.NewsPageTitle>소식</S.NewsPageTitle>
        <S.SkeletonNewsContainer $isMobile={isMobile}>
          {Array.from({ length: 6 }).map((_, idx) => (
            <S.SkeletonNewsItem key={idx} $isMobile={isMobile} />
          ))}
        </S.SkeletonNewsContainer>
      </S.SkeletonContainer>
    );
  }

  if (newsError) {
    return (
      <S.Container>
        <S.DescriptionContainer>
          <S.Message $isMobile={isMobile}>아직 등록된 소식이 없어요.</S.Message>
          <S.MiniMessage $isMobile={isMobile}>곧 FarmSystem의 다양한 소식을 알려드릴게요!</S.MiniMessage>
        </S.DescriptionContainer>
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.NewsPageTitle>소식</S.NewsPageTitle>
      {newsDataSorted && newsDataSorted.length > 0 ? (
        <>
          <S.NewsContainer>
            {currentNews?.map((news, index) => (
              <NewsItem key={index} newsListData={news} />
            ))}
          </S.NewsContainer>
          {totalPages > 1 && (
            <S.PaginationContainer>
              <S.PaginationButton>
                <S.PaginationButtonText onClick={() => setCurrentPage(0)} $disabled={currentPage === 0}>
                  <img src={jumpArrow_left} alt="jumpArrow" />
                </S.PaginationButtonText>
                <S.PaginationButtonText onClick={handlePreviousPage} $disabled={currentPage === 0}>
                  <img src={nextArrow_left} alt="nextArrow" />
                </S.PaginationButtonText>

                {generatePageNumbers().map((pageNum) => (
                  <S.PaginationPageButton
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    $active={pageNum === currentPage}
                  >
                    {pageNum + 1}
                  </S.PaginationPageButton>
                ))}

                <S.PaginationButtonText onClick={handleNextPage} $disabled={currentPage >= totalPages - 1}>
                  <img src={nextArrow_right} alt="nextArrow_right" />
                </S.PaginationButtonText>
                <S.PaginationButtonText onClick={() => setCurrentPage(totalPages - 1)} $disabled={currentPage >= totalPages - 1}>
                  <img src={jumpArrow_right} alt="jumpArrow_right" />
                </S.PaginationButtonText>
              </S.PaginationButton>
            </S.PaginationContainer>
          )}
        </>
      ) : (
        <S.DescriptionContainer>
          <S.Message $isMobile={isMobile}>아직 등록된 소식이 없어요.</S.Message>
          <S.MiniMessage $isMobile={isMobile}>곧 FarmSystem의 다양한 소식을 알려드릴게요!</S.MiniMessage>
        </S.DescriptionContainer>
      )}
    </S.Container>
  );
}