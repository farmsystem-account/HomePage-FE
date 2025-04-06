import React, { useCallback, useEffect, useRef } from 'react';
import * as S from './index.styled';
import Card from './Card';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import WhiteContentContainer from '@/layouts/WhiteContentContainer';
import { useFarmingLogsInfiniteQuery } from '@/services/query/useFarmingLogInfiniteQuery';
import useFarmingLogStore from '@/stores/farminglogStore';
import CardSkeleton from './CardSkeleton';

import EditImage from '@/assets/Icons/edit-3.png';

export default function View() {
  const navigate = useNavigate();
  const { isApp, isMobile, isDesktop } = useMediaQueries();

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    error,
    refetch
  } = useFarmingLogsInfiniteQuery();
  const { isNeedRefresh, setIsNeedRefresh } = useFarmingLogStore();

  useEffect(() => {
    if (isNeedRefresh) {
      refetch();
      setIsNeedRefresh(false);
    }
  }, [isNeedRefresh, refetch, setIsNeedRefresh]);

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
          <S.EndOfList>
            <S.EndOfListText
              $isApp={isApp}
              $isMobile={isMobile}
              $isDesktop={isDesktop}
            >
              더 이상 글이 없습니다.
            </S.EndOfListText>
          </S.EndOfList>
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
    </WhiteContentContainer>
  );
}
