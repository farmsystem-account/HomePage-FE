import * as S from './Card.styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import { FarmingLog,
  FarmingLogCategoryDisplayMapping
} from '@/models/farminglog';
import { useToggleLikeMutation } from '@/services/mutation/FarmingLog';
import useFarmingLogStore from '@/stores/farminglogStore';

import { convertUrlsToLinks } from '@/utils/convertUrlsToLinks';

import { FiEdit3 } from "react-icons/fi";
import Heart from '@/assets/Icons/heart.png';
import HeartPC from '@/assets/Icons/heart-pc.png';
import HeartFill from '@/assets/Icons/heart-fill.png';
import ChecvronRight from '@/assets/Icons/chevron-right.png';

interface CardProps {
  data: FarmingLog;
}

const trackOptions = [
  { key: "UNION", label: "유니온" },
  { key: "GAMING_VIDEO", label: "게임/영상" },
  { key: "IOT_ROBOTICS", label: "사물인터넷/로봇" },
  { key: "BIGDATA", label: "빅데이터" },
  { key: "SECURITY_WEB", label: "보안/웹" },
  { key: "AI", label: "인공지능" }
];

// 날짜 파싱 함수
function formatIsoToCustomDateTime(isoString: string): string {
  const date = new Date(isoString);

  // 간단히 2자리 맞춰주는 헬퍼
  const pad2 = (num: number): string => String(num).padStart(2, '0');

  const year = date.getFullYear();
  const month = pad2(date.getMonth() + 1);
  const day = pad2(date.getDate());
  const hours = pad2(date.getHours());
  const minutes = pad2(date.getMinutes());

  return `${year}/${month}/${day} ${hours}:${minutes}`;
}

export default function Card({ data }: CardProps) {
  const [content, setContent] = useState('');
  const [viewDetail, setViewDetail] = useState(false);
  const [showDetailButton, setShowDetailButton] = useState(false);
  const [liked, setLiked] = useState(data.isLiked);
  const [likeCount, setLikeCount] = useState(data.likeCount);
  const [clicked, setClicked] = useState(false);

  const navigate = useNavigate();
  const { isApp, isMobile, isDesktop } = useMediaQueries();
  const { mutate: toggleLikeMutate } = useToggleLikeMutation();
  const {
    setIsEditMode,
    setFarmingLogId,
    setFarminglogTitle,
    setFarminglogContent,
    setFarminglogCategory,
  } = useFarmingLogStore();

  const handleLikeClick = () => {
    setLiked(prev => !prev);
    setClicked(true);
    toggleLikeMutate(data.farmingLogId);
    if (liked) {
      setLikeCount(prev => prev - 1);
    } else { 
      setLikeCount(prev => prev + 1);
    }
    setTimeout(() => setClicked(false), 300);
  };

  const handleEditClick = () => {
    setIsEditMode(true);
    setFarmingLogId(data.farmingLogId);
    setFarminglogTitle(data.title);
    setFarminglogContent(data.content);
    setFarminglogCategory(data.category);
    navigate('/farminglog/create');
  };

  useEffect(() => {
    // PC에선 더보기 없이 그냥 표시
    if (!isApp) {
      setContent(data.content);
      setShowDetailButton(false);
      return;
    }
  
    if (data.content.length > 150) {
      setShowDetailButton(true);
      if (viewDetail) {
        setContent(data.content);
      } else {
        setContent(data.content.slice(0, 150) + '...');
      }
    } else {
      setContent(data.content);
      setShowDetailButton(false);
    }
  }, [data.content, viewDetail, isApp]);

  return (
    <S.FarmingLogCard $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
      {/** 
        *  우선 이미지 없이 진행
        * <S.Thumbnail src={data.thumbnail} alt="썸네일" />
        */}
      <S.ContentContainer>
        <S.CategoryContainer>
          <S.Category $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
            {FarmingLogCategoryDisplayMapping[data.category]}
          </S.Category>
          {data.isOwner && (
            <S.EditButton onClick={handleEditClick}>
              <FiEdit3 
                style={{ 
                  width: isApp ? '20px' : isMobile ? '24px' : '28px',
                  height: isApp ? '20px' : isMobile ? '24px' : '28px',
                }}
                aria-label="수정" 
              />
            </S.EditButton>
          )}
        </S.CategoryContainer>
        <S.TitleContainer>
          <S.Title $isApp={isApp} $isMobile={isMobile}>{data.title}</S.Title>
          <S.LikeContainer onClick={handleLikeClick}>
            <S.LikeImage
              src={liked ? HeartFill : isApp ? Heart : HeartPC }
              clicked={!!clicked}
              alt="좋아요"
              $isApp={isApp}
              $isMobile={isMobile}
            />
            <S.LikeCount $isApp={isApp} $isMobile={isMobile}>
              {likeCount}
            </S.LikeCount>
          </S.LikeContainer>
        </S.TitleContainer>
        <S.InfoContainer>
          <S.CreatedAt $isApp={isApp} $isMobile={isMobile}>
            {formatIsoToCustomDateTime(data.createdAt)}
          </S.CreatedAt>
          <S.Author $isApp={isApp} $isMobile={isMobile}>
            {data.author} | {trackOptions.find(option => option.key === data.track)?.label}
          </S.Author>
        </S.InfoContainer>
        <S.Content $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
          {convertUrlsToLinks(content)}
        </S.Content>
      </S.ContentContainer>
      {showDetailButton && (
        <S.DetailContainer>
          <S.DetailButton onClick={() => setViewDetail(!viewDetail)}>
            <S.DetailButtonText>{viewDetail ? '간략히' : '자세히'}</S.DetailButtonText>
            <S.DetailButtonImage 
              src={ChecvronRight}
              alt="더보기"
              viewDetail={viewDetail}
            />
          </S.DetailButton>
        </S.DetailContainer>
      )}
    </S.FarmingLogCard>
  );
}