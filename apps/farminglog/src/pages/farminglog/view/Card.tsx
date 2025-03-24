import * as S from './Card.styled';
import { useEffect, useState } from 'react';
import Heart from '@/assets/icons/heart.png';
import HeartFill from '@/assets/icons/heart-fill.png';
import ChecvronRight from '@/assets/icons/chevron-right.png';

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
  const [liked, setLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [clicked, setClicked] = useState(false);

  const handleLikeClick = () => {
    if (liked) return; // 이미 좋아요 눌렀으면 무시
  
    setLiked(true);
    setLikeCount(prev => prev + 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

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
          <S.LikeContainer onClick={handleLikeClick}>
          <S.LikeImage
            src={liked ? HeartFill : Heart}
            
            clicked={!!clicked}
            alt="좋아요"
          />
          <S.LikeCount>{likeCount}</S.LikeCount>
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