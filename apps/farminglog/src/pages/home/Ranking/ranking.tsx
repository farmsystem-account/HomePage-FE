import { useRef, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router';
import * as S from './ranking.styled';
import useMediaQueries from '@/hooks/useMediaQueries';

import UpArrowImg from '@/assets/Icons/UpArrow.png';
import FarmLogoImg from '@/assets/Icons/FarmSystem_Logo.png';
import CrownImg from '@/assets/Icons/crown.png';

import { useUserRankingQuery } from '@/services/query/useUserRankingQuery';
import CheerBalloon from '@/pages/ranking/components/CheerBalloon';
import ProfilePopup from '@/components/Popup/ProfilePopup';

export default function RankingPreview() {
  const navigate = useNavigate();
  const { isMobile, isApp, isTablet } = useMediaQueries();

  // 풍선 표시를 위한 상태들
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [balloonPosition, setBalloonPosition] = useState<{ x: number; y: number } | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);

  // 풍선 DOM
  const balloonRef = useRef<HTMLDivElement>(null);

  // 랭킹 데이터
  const { data, isLoading } = useUserRankingQuery();

  // 클릭이 랭킹 아이템/풍선 바깥에서 일어나면 풍선 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ranking-item') && !target.closest('.cheer-balloon')) {
        setSelectedIndex(null);
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

  // 미리보기용: 내 순위 + 상위 3명
  const previewRankingData = [data.myRank, ...data.userRankList.slice(0, 3)];

  return (
    <>
      <S.ProfileWrapper $isMobile={isMobile} $isTablet={isTablet}>
        <S.TitleBox $isMobile={isMobile} $isTablet={isTablet}>
          <S.Title $isMobile={isMobile}>랭킹</S.Title>
          <S.BackArrow
            src={UpArrowImg}
            alt="확대하기"
            onClick={() => navigate('/rankingDetail')}
          />
        </S.TitleBox>

        <S.PhaseDesc $isMobile={isMobile}>
          · 랭킹은 씨앗을 기준으로 0시간마다 정렬돼요.
          <br />
          · 씨앗은 트랙별 우수활동자 심사에 반영돼요.
        </S.PhaseDesc>

        <S.RankingTitle isApp={isApp}>
          <S.RankingTitleText isApp={isApp}>순위</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>이름/전공</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>누적 씨앗 개수</S.RankingTitleText>
        </S.RankingTitle>

        <S.RankingList>
          {previewRankingData.map((item, index) => (
            <S.RankingItem
              key={item.userId}
              className="ranking-item"
              bgColor={getBgColor(item.rank)}
              isMe={item.userId === data.myRank.userId}
              isApp={isApp}
              onClick={(e) => {
                // 풍선 크기 가정
                const balloonWidth = 210;
                const balloonHeight = 120;

                // 클릭한 지점(pageX, pageY) 기반 좌표계산
                // pageX/pageY는 문서 전체 기준이므로 스크롤 고려가 자동으로 됩니다.
                const x = e.pageX - balloonWidth / 2 - 200;
                const y = e.pageY - balloonHeight - 570; // 10px 정도 위로 띄워주기

                setSelectedIndex(index);
                setBalloonPosition({ x, y });
              }}
            >
              <S.RankBox>
                <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
                {item.rank <= 3 && <S.CrownIcon src={CrownImg} alt="왕관" />}
              </S.RankBox>

              <S.ProfileSection>
                <S.ProfileIcon src={item.profileImageUrl || FarmLogoImg} />
                <S.ColumnBox>
                  <S.Name isApp={isApp}>{item.name}</S.Name>
                  <S.Track isApp={isApp}>
                    {item.generation}기 {item.track}
                  </S.Track>
                </S.ColumnBox>
              </S.ProfileSection>

              <S.Score isApp={isApp}>{item.totalSeed}</S.Score>
            </S.RankingItem>
          ))}
        </S.RankingList>

        <AnimatePresence>
          {selectedIndex !== null && balloonPosition && (
            <CheerBalloon
              ref={balloonRef}
              isApp={isApp}
              x={balloonPosition.x}
              y={balloonPosition.y}
              onClose={() => setSelectedIndex(null)}
              onCheerClick={() => {
                console.log('응원하기 클릭');
                setSelectedIndex(null);
              }}
              onProfileClick={() => {
                setShowProfilePopup(true);
              }}
            />
          )}
        </AnimatePresence>
      </S.ProfileWrapper>

      {showProfilePopup && selectedIndex !== null && (
        <ProfilePopup
          isOpen={showProfilePopup}
          userName={previewRankingData[selectedIndex].name}
          generationAndPart={`${previewRankingData[selectedIndex].generation}기 ${previewRankingData[selectedIndex].track}`}
          profileImg={previewRankingData[selectedIndex].profileImageUrl}
          onClose={() => setShowProfilePopup(false)}
        />
      )}
    </>
  );
}
