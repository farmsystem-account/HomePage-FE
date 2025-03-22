import * as S from './Card.styled';
import { useEffect, useState } from 'react';
import Heart from '@/assets/icons/heart.svg';
import ChecvronRight from '@/assets/icons/chevron-right.svg';

interface Data{
  farmingLogId: number,
  title: string,
  thumbnail?: string,
  content: string,
  category: string,
  createdAt: string,
  author: string,
  profileImageUrl: string,
  track: string,
  generation: number,
  isOwner: boolean,
  isLiked: boolean,
  likeCount: number
}

interface CardProps {
  data: Data
}

export default function Card({ data }: CardProps) {
  const [content, setContent] = useState('');
  const [viewDetail, setViewDetail] = useState(false);
  const [showDetailButton, setShowDetailButton] = useState(false);

  useEffect(() => {
    if (data.content.length > 150) {
      setShowDetailButton(true);
      if (viewDetail) setContent(data.content);
      else setContent(data.content.slice(0, 150) + '...');
    } else {
      setContent(data.content);
      setShowDetailButton(false);
    }
  }
  , [data.content, viewDetail]);

  return (
    <S.FarmingLogCard>
      <S.Thumbnail src={data.thumbnail} alt="썸네일" />
      <S.ContentContainer>
        <S.CategoryContainer>
          <S.Category>{data.category}</S.Category>
        </S.CategoryContainer>
        <S.TitleContainer>
          <S.Title>{data.title}</S.Title>
          <S.LikeContainer>
            <S.LikeImage src={Heart} />
            <S.LikeCount>{data.likeCount}</S.LikeCount>
          </S.LikeContainer>
        </S.TitleContainer>
        <S.InfoContainer>
          <S.CreatedAt>{data.createdAt}</S.CreatedAt>
          <S.Author>{data.author} | {data.track}</S.Author>
        </S.InfoContainer>
        <S.Content>{content}</S.Content>
      </S.ContentContainer>
      {showDetailButton && (
        <S.DetailContainer>
          <S.DetailButton onClick={() => setViewDetail(!viewDetail)}>
            <S.DetailButtonText>{viewDetail ? '간략히' : '자세히'}</S.DetailButtonText>
            <S.DetailButtonImage src={ChecvronRight} alt="더보기" />
          </S.DetailButton>
        </S.DetailContainer>
      )}
    </S.FarmingLogCard>
  );
}