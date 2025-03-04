import * as S from './NewsItem.styled';
import { newsData } from '@/models/news';
import PlaceHolder from '@/assets/Images/news/PlaceHolder.png';
import Logger from '@/utils/Logger';

const dummyTags = ['태그1', '태그2', '태그3'];

export default function NewsItem({ newsData }: { newsData: newsData }) {
  Logger.log(newsData);
  const { title, content } = newsData;
  
  // 아직 썸네일과 태그 정보가 없으므로 placeholder와 dummyTags 사용
  const thumbnailSrc = PlaceHolder;
  const tags = dummyTags;

  const maxLength = 200;
  const truncatedContent = content.length > maxLength 
    ? content.slice(0, maxLength) + '...'
    : content;

  return (
    <S.NewsItem onClick={() => Logger.log('뉴스 클릭')}>
      <S.Thumbnail src={thumbnailSrc} alt={title} />
      <S.NewsContent>
        <S.Title>{title}</S.Title>
        <S.Content>{truncatedContent}</S.Content>
        <S.TagBox>
          {tags.map((tag, index) => (
            <S.Tag key={index}>{tag}</S.Tag>
          ))}
        </S.TagBox>
      </S.NewsContent>
    </S.NewsItem>
  );
}