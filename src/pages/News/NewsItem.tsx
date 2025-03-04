import * as S from './NewsItem.styled';
import { newsData } from '@/models/news';
import PlaceHolder from '@/assets/images/placeholder.png';

const dummyTags = ['태그1', '태그2', '태그3'];

export default function NewsItem({ newsData }: { newsData: newsData }) {
  const { title, content } = newsData;
  
  // 아직 썸네일과 태그 정보가 없으므로 placeholder와 dummyTags 사용
  const thumbnailSrc = PlaceHolder;
  const tags = dummyTags;

  return (
    <S.NewsItem>
      <S.Thumbnail src={thumbnailSrc} alt={title} />
      <S.NewsContent>
        <S.Title>{title}</S.Title>
        <S.Content>{content}</S.Content>
        <S.TagBox>
          {tags.map((tag, index) => (
            <S.Tag key={index}>{tag}</S.Tag>
          ))}
        </S.TagBox>
      </S.NewsContent>
    </S.NewsItem>
  );
}