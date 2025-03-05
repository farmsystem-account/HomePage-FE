import { useEffect } from "react";
import { useParams } from "react-router";
import { useNewsDetail } from "@/hooks/useNews";
import Logger from "@/utils/Logger";
 // 상위 디렉토리 인덱스랑 레이아웃 비슷할 거 같아서 끌고오기
import * as S from "../index.styled";

export default function NewsDetail() {
  const { newsId } = useParams<{ newsId: string }>();
  const { data: newsData, loading: newsLoading, error: newsError } = useNewsDetail(Number(newsId));

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
    <S.Container>
      <S.NewsPageTitle>소식</S.NewsPageTitle>
      <S.Line />
      <h2>{newsData?.title}</h2>
      <p>{newsData?.content}</p>
    </S.Container>
  );
}