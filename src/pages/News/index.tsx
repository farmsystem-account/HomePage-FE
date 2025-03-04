import useMediaQueries from '@/hooks/useMediaQueries';
import { useNewsList } from '@/hooks/useNews';
import Logger from '@/utils/Logger';
import * as S from './News.styles';


export default function News() {
  const { isMobile } = useMediaQueries();
  const { data: newsData, loading: newsLoading, error: newsError } = useNewsList();
  
  if (newsLoading) {
    return (
      <S.Container>
        <S.Message $isMobile={isMobile}>Loading...</S.Message>
      </S.Container>
    );
  }

  if (newsError) {
    Logger.error(newsError);
    return (
      <S.Container>
        <S.Message $isMobile={isMobile}>뉴스를 불러오는 중 오류가 발생했습니다.</S.Message>
      </S.Container>
    );
  }

  return (
    <S.Container>
      {newsData && newsData.length > 0 ? (
        newsData.map((news, index) => (
          <div key={index}>
            <h2>{news.title}</h2>
            <p>{news.content}</p>
          </div>
        ))
      ) : (
        <S.DescriptionContainer>
          <S.Message $isMobile={isMobile}>아직 등록된 소식이 없어요.</S.Message>
          <a>곧 FarmSystem의 다양한 소식을 알려드릴게요!</a>
        </S.DescriptionContainer>
      )}
    </S.Container>
  );
}