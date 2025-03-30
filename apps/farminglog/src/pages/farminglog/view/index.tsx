import React, { useCallback, useRef } from 'react';
import * as S from './index.styled';
import Card from './Card';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useFarmingLogsInfiniteQuery } from '@/services/query/useFarmingLogInfiniteQuery';

import GoBackImage from '@/assets/Icons/corner-up-left.png';
import EditImage from '@/assets/Icons/edit-3.png';

export default function View() {
  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    error,
  } = useFarmingLogsInfiniteQuery();

  // 마지막 카드 요소를 관찰하여 다음 페이지를 불러오기 위한 IntersectionObserver
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastLogRef = useCallback(
    (node: HTMLDivElement) => {
      if (isFetchingNextPage) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
      if (node) observerRef.current.observe(node);
    },
    [isFetchingNextPage, fetchNextPage, hasNextPage]
  );

  // 로딩 또는 에러 상태 처리
  if (isLoading) return <div>로딩중...</div>;
  if (error) return <div>에러 발생: {error.message}</div>;
  if (!data) return <div>데이터가 없습니다.</div>;

  return (
    <S.MainContainer>
      <S.FarmingLogContainer
        $isApp={isApp}
        $isMobile={isMobile}
        $isTablet={isTablet}
        $isDesktop={isDesktop}
      >
        <S.FarmingLogContainerHeader
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
        >
          <S.GoBackButton
            $isApp={isApp}
            $isMobile={isMobile}
            $isDesktop={isDesktop}
            onClick={() => navigate(-1)}
          >
            <img src={GoBackImage} alt="뒤로가기" />
          </S.GoBackButton>
          <S.FarmingLogContainerTitle
            $isApp={isApp}
            $isMobile={isMobile}
            $isDesktop={isDesktop}
          >
            파밍 로그
          </S.FarmingLogContainerTitle>
        </S.FarmingLogContainerHeader>
        <S.FarmingLogCardContainer
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
        >
          {data.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.content.map((log, idx) => {
                // 마지막 페이지의 마지막 요소에 ref 적용
                const isLastItem =
                  pageIndex === data.pages.length - 1 &&
                  idx === page.content.length - 1;
                return (
                  <div
                    key={log.farmingLogId}
                    ref={isLastItem ? lastLogRef : null}
                  >
                    <Card data={log} />
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </S.FarmingLogCardContainer>
        {isFetchingNextPage && <div>로딩중...</div>}
        {!hasNextPage && !isFetching && (
          <div>더 불러올 게시글이 없습니다.</div>
        )}
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
      </S.FarmingLogContainer>
    </S.MainContainer>
  );
}
