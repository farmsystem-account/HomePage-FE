import { useEffect } from "react";
import { useParams } from "react-router";
import { useNewsDetail } from "@/hooks/useNews";
import Logger from "@/utils/Logger";
import DetailLayout from "@/layouts/DetailLayout/DetailLayout";
import * as S from "./index.styled";
import useMediaQueries from "@/hooks/useMediaQueries";
// import { newsData } from '@/models/news';
// import PlaceHolder from '@/assets/Images/news/PlaceHolder.png';

export default function NewsDetail() {
  const { newsId } = useParams<{ newsId: string }>();
  const { data: newsData, loading: newsLoading, error: newsError } = useNewsDetail(Number(newsId));
  const { isMobile, isTablet, isDesktop } = useMediaQueries();

  useEffect(() => {
    if (!newsId) return ;
  }, [newsId]);

  if (newsLoading) {
    return (
      <S.Container>
        Loading...
      </S.Container>
    );
  }

  if (newsError) {
    Logger.error(newsError);
    return (
      <S.Container>
        뉴스를 불러오는 중 오류가 발생했습니다.
      </S.Container>
    );
  }

  return (
    <S.Container $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
      <S.NewsPageTitle $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        소식
      </S.NewsPageTitle>
      <DetailLayout
        title={newsData?.title}
        content={newsData?.content}
        date={newsData?.createdAt} 
        tag={newsData?.tags?.join(", ") || "기타"}
        thumbnailUrl={newsData?.thumbnailUrl}
        imageUrls={newsData?.imageUrls}
      />
    </S.Container>
  );
}