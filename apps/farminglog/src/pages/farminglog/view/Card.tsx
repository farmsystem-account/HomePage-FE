import * as S from './Card.styled';
import Heart from '@/assets/icons/heart.svg';

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
        <S.Content>{data.content}</S.Content>
      </S.ContentContainer>
    </S.FarmingLogCard>
  );
}