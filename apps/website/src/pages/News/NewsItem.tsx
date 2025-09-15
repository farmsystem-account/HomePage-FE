import * as S from './NewsItem.styled';
import { newsListData } from '@/models/news';
import PlaceHolder from '@/assets/Images/news/PlaceHolder.png';
import Logger from '@/utils/Logger';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import { formatKoreanDateTimeNoHour } from '@/utils/formatKoreanDateTime';

export default function NewsItem({ newsListData }: { newsListData?: newsListData }) {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useMediaQueries();

  if (!newsListData) {
    return null;
  }

  Logger.log(newsListData);
  const { 
    title = "", 
    tags = [],
    contentPreview  } = newsListData;
  const thumbnailSrc = newsListData.thumbnailUrl || PlaceHolder;
  const maxLength = 800;
  const truncatedContent = contentPreview.length > maxLength 
    ? contentPreview.slice(0, maxLength) + '...'
    : contentPreview;

  return (
    <S.NewsItem 
      $isMobile={isMobile}
      $isTablet={isTablet}
      onClick={() => navigate(`/news/${newsListData.newsId}`)}
    >
      <S.Thumbnail src={thumbnailSrc} alt={title} $isMobile={isMobile} />
      <S.NewsContent $isMobile={isMobile}>
        <S.Title $isMobile={isMobile}>{title}</S.Title>
        <S.Content $isMobile={isMobile}>{truncatedContent}</S.Content>
        <S.DateAndTagBox $isMobile={isMobile}>
          <S.Date $isMobile={isMobile}>게시일자: {formatKoreanDateTimeNoHour(newsListData.createdAt)}</S.Date>
          <S.TagBox $isMobile={isMobile}>
            {tags.map((tag, index) => (
              <S.Tag key={index} $isMobile={isMobile}>{tag}</S.Tag>
            ))}
          </S.TagBox>
      </S.DateAndTagBox>
      </S.NewsContent>
    </S.NewsItem>
  );
}