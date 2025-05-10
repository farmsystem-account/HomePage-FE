import * as S from './NewsItem.styled';
import { newsListData } from '@/models/news';
import PlaceHolder from '@/assets/Images/news/PlaceHolder.png';
import Logger from '@/utils/Logger';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';

const dummyTags = ['태그1'];

export default function NewsItem({ newsListData }: { newsListData?: newsListData }) {
  const navigate = useNavigate();
  const isMobile = useMediaQueries().isMobile;

  if (!newsListData) {
    return null;
  }

  Logger.log(newsListData);
  const { 
    title = "", 
    // content = "",
    content = "백엔드에서데이터를안주면서디자인상에는 content, 즉 글목록이 있기에 일단 이렇게 아무 텍스트나 채워넣으렵니다. 아무래도 이걸 확인한게 좀 많이 늦은 시간이므로 일단을 이렇게 땜빵하겠습니다. 나중에 커밋로그 다른사람이 뒤져보다 발견하면 그냥 허허 하고 넘어가쇼" 
  } = newsListData;
  
  const thumbnailSrc = newsListData.thumbnailUrl || PlaceHolder;
  const tags = dummyTags;

  const maxLength = 200;
  const truncatedContent = content.length > maxLength 
    ? content.slice(0, maxLength) + '...'
    : content;

  return (
    <S.NewsItem 
      $isMobile={isMobile}
      onClick={() => navigate(`/news/${newsListData.newsId}`)}
    >
      <S.Thumbnail src={thumbnailSrc} alt={title} $isMobile={isMobile} />
      <S.NewsContent $isMobile={isMobile}>
        <S.Title $isMobile={isMobile}>{title}</S.Title>
        <S.Content $isMobile={isMobile}>{truncatedContent}</S.Content>
        <S.TagBox $isMobile={isMobile}>
          {tags.map((tag, index) => (
            <S.Tag key={index} $isMobile={isMobile}>{tag}</S.Tag>
          ))}
        </S.TagBox>
      </S.NewsContent>
    </S.NewsItem>
  );
}