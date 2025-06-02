//ranking.tsx
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import * as S from './ranking.styled';
import useMediaQueries from '@/hooks/useMediaQueries';
import { convertTrackToString } from '@/utils/convertTrackToString';

import UpArrowImg from '@/assets/Icons/UpArrow.png';
import FarmLogoImg from '@/assets/Icons/FarmSystem_Logo.png';
import CrownImg from '@/assets/Icons/crown.png';

import { useUserRankingQuery } from '@/services/query/useUserRankingQuery';
import CheerBalloon from '@/pages/ranking/components/CheerBalloon';
import ProfilePopup from '@/components/Popup/ProfilePopup';

const getMousePos = (e: MouseEvent, container?: HTMLElement | null) => {
  if (container) {
    const bounds = container.getBoundingClientRect();
    return {
      x: e.clientX - bounds.left,
      y: e.clientY - bounds.top,
    };
  }
  return { x: e.clientX, y: e.clientY };
};

export default function RankingPreview() {
  const navigate = useNavigate();
  const { isMobile, isApp, isTablet } = useMediaQueries();
  const containerRef = useRef<HTMLDivElement>(null);

  const [balloonIndex, setBalloonIndex] = useState<number | null>(null);
  const [balloonPosition, setBalloonPosition] = useState<{ x: number; y: number } | null>(null);
  const [popupIndex, setPopupIndex] = useState<number | null>(null);

  const { data, isLoading } = useUserRankingQuery();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ranking-item') && !target.closest('.cheer-balloon')) {
        setBalloonIndex(null);
        setBalloonPosition(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getBgColor = (rank: number) => {
    if (rank === 1) return '#5CD282';
    if (rank === 2) return '#7CDA9A';
    if (rank === 3) return '#ABE6BF';
    return '#D8D8D8';
  };

  if (isLoading || !data) return null;

  // 상위 3명만 보여주는 예시
  const previewRankingData = [...data.userRankList.slice(0, 3)].filter(item => item !== null);

  // 랭킹 클릭 -> 풍선 표시
  const handleRankItemClick = (e: React.MouseEvent, index: number) => {
    const balloonWidth = 210;
    const balloonHeight = 120;
    const pos = getMousePos(e.nativeEvent, containerRef.current);
    const x = pos.x - balloonWidth / 2;
    const y = pos.y - balloonHeight;

    setBalloonIndex(index);
    setBalloonPosition({ x, y });
  };

  // 풍선에서 "프로필 보기" 클릭
  const handleProfileClick = () => {
    if (balloonIndex !== null) {
      setBalloonIndex(null);
      setBalloonPosition(null);
      setPopupIndex(balloonIndex);
    }
  };

  return (
    <>
      <S.ProfileWrapper ref={containerRef} $isMobile={isMobile} $isTablet={isTablet}>
        <S.TitleBox $isMobile={isMobile} $isTablet={isTablet}>
          <S.Title $isMobile={isMobile}>랭킹</S.Title>
          <S.BackArrow
            $isMobile={isMobile}
            src={UpArrowImg}
            alt="확대하기"
            onClick={() => navigate('/rankingDetail')}
          />
        </S.TitleBox>

        <S.PhaseDesc $isMobile={isMobile}>
          · 랭킹은 씨앗을 기준으로 매일 자정마다 정렬돼요.
          <br />
          · 씨앗은 트랙별 우수활동자 심사에 반영돼요.
          <br />
          · 친구 프로필을 눌러 응원할 수 있어요!
        </S.PhaseDesc>

        <S.RankingTitle isApp={isApp}>
          <S.RankingTitleText isApp={isApp}>순위</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>이름/트랙</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>누적 씨앗 개수</S.RankingTitleText>
        </S.RankingTitle>

        <S.RankingList>
          {previewRankingData.map((item, idx) => (
            <S.RankingItem
              key={item.userId}
              className="ranking-item"
              bgColor={getBgColor(item.rank)}
              isMe={false}
              isApp={isApp}
              onClick={(e) => handleRankItemClick(e, idx)}
            >
              <S.RankBox>
                <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
                {item.rank <= 3 && <S.CrownIcon src={CrownImg} alt="왕관" />}
              </S.RankBox>

              <div style={{ width: '140px', visibility: 'hidden' }} />

              <S.ProfileSection>
                <S.ProfileIcon src={item.profileImageUrl || FarmLogoImg} />
                <S.ColumnBox>
                  <S.Name isApp={isApp}>{item.name}</S.Name>
                  <S.Track isApp={isApp}>
                    {item.generation}기/{convertTrackToString(item.track)}
                  </S.Track>
                </S.ColumnBox>
              </S.ProfileSection>

              <S.Score isApp={isApp}>{item.totalSeed}</S.Score>
            </S.RankingItem>
          ))}
        </S.RankingList>

        <AnimatePresence>
          {balloonIndex !== null && balloonPosition && (
            <CheerBalloon
              isApp={isApp}
              x={balloonPosition.x}
              y={balloonPosition.y}
              /** ranking 데이터 중 현재 풍선 띄워진 유저 정보 전달 */
              userId={previewRankingData[balloonIndex].userId}
              userName={previewRankingData[balloonIndex].name}
              onClose={() => {
                setBalloonIndex(null);
                setBalloonPosition(null);
              }}
              // (userId, userName) 넘겨서 /cheer/write?userId=...&name=... 로 이동
              onCheerClick={(userId, userName) => {
                setBalloonIndex(null);
                setBalloonPosition(null);
                navigate(`/cheer/write?userId=${userId}&name=${userName}`);
              }}
              onProfileClick={() => {
                handleProfileClick();
              }}
            />
          )}
        </AnimatePresence>
      </S.ProfileWrapper>

      {/* 프로필 팝업 */}
      {popupIndex !== null && (
        <ProfilePopup
          isOpen={true}
          userName={previewRankingData[popupIndex].name}
          generationAndPart={`${previewRankingData[popupIndex].generation}기 ${convertTrackToString(
            previewRankingData[popupIndex].track
          )}`}
          profileImg={previewRankingData[popupIndex].profileImageUrl}
          major={previewRankingData[popupIndex].major}
          githubId={previewRankingData[popupIndex].githubAccount}
          onClose={() => {
            setPopupIndex(null);
          }}
        />
      )}
    </>
  );
}
