import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AnimatePresence } from 'framer-motion';
import * as S from './index.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import FarmLogo from '../../assets/Icons/FarmSystem_Logo.png';
import Crown from '../../assets/Icons/crown.png';
import Sign from '@/components/Ranking/sign';
import CheerBalloon from './components/CheerBalloon';
import { useUserRankingQuery } from '@/services/query/useUserRankingQuery';
import { convertTrackToString } from '@/utils/convertTrackToString';
import ProfilePopup from '@/components/Popup/ProfilePopup';
import WhiteContentContainer from '@/layouts/WhiteContentContainer';
import Popup from "@/components/Popup/popup"; 
import { useUserInfoQuery } from "@repo/auth/services/query/useUserInfoQuery";

const headerTexts = [
  '랭킹은 씨앗을 기준으로 매일 자정마다 정렬돼요.',
  '씨앗은 트랙별 우수활동자 심사에 반영돼요.',
  '친구의 프로필을 눌러 응원할 수 있어요!'
];

export default function Main() {
  const navigate = useNavigate();
  const { data, isLoading } = useUserRankingQuery();
  const { isMobile, isApp } = useMediaQueries();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [balloonPosition, setBalloonPosition] = useState<{ x: number; y: number } | null>(null);
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const balloonRef = useRef<HTMLDivElement>(null);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false); 
  const { data: user } = useUserInfoQuery();

  const getBgColor = (rank: number) => {
    if (rank === 1) return '#5CD282';
    if (rank === 2) return '#7CDA9A';
    if (rank === 3) return '#ABE6BF';
    return '#D8D8D8';
  };

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

  if (isLoading || !data) return null;

  const rankingData = [data.myRank, ...data.userRankList].filter(item => item !== null);

  return (
    <WhiteContentContainer title='랭킹' >

        <S.PhaseTitle $isMobile={isMobile}>
           씨앗이 쌓이면, 랭킹이 바로 올라요!
        </S.PhaseTitle>
        <S.PhaseDesc $isMobile={isMobile}>
          · 랭킹은 씨앗을 기준으로 0시간마다 정렬돼요.
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
          {rankingData.map((item, index) => (
            <S.RankingItem
              key={item.userId}
              className="ranking-item"
              bgColor={getBgColor(item.rank)}
              isMe={index === 0}
              isApp={isApp}
              onClick={(e) => {
                if (index === 0) {
                  // 내 정보 클릭 시: 내 정보 팝업
                  setProfilePopupOpen(true);
                } else {
                  // 다른 유저 클릭 시: 응원 벌룬
                  setShowProfilePopup(false);
                  setSelectedIndex(index);
                  setBalloonPosition({
                    x: e.pageX - 105,
                    y: e.pageY - 115,
                  });
                }
              }}
            >
              <S.RankBox>
                <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
                {item.rank <= 3 && <S.CrownIcon src={Crown} alt="crown" isMobile={isMobile} />}
              </S.RankBox>

              {/* 균형을 맞추기 위한 더미 요소 */}
              <div style={{ width: '140px', visibility: 'hidden' }} />
              
              <S.ProfileSection>
                <S.ProfileIcon src={item.profileImageUrl || FarmLogo} />
                <S.ColumnBox>
                  <S.Name isApp={isApp}>{item.name}</S.Name>
                  <S.Track isApp={isApp}>{item.generation}기 {convertTrackToString(item.track)}</S.Track>
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
            userId={rankingData[selectedIndex!].userId}         // 추가
            userName={rankingData[selectedIndex!].name}         // 추가
            onClose={() => setSelectedIndex(null)}
            onCheerClick={() => {
              const { userId, name } = rankingData[selectedIndex!];
              navigate(`/cheer/write?userId=${userId}&name=${encodeURIComponent(name)}`);
              setSelectedIndex(null);
            }}
            onProfileClick={() => {
              setShowProfilePopup(true);
            }}
          />

          )}
        </AnimatePresence>

        {showProfilePopup && selectedIndex !== null && (
          <ProfilePopup
            isOpen={showProfilePopup}
            userName={rankingData[selectedIndex].name}
            generationAndPart={`${rankingData[selectedIndex].generation}기 ${convertTrackToString(rankingData[selectedIndex].track)}`}
            profileImg={rankingData[selectedIndex].profileImageUrl}
            major={rankingData[selectedIndex].major}
            githubId={rankingData[selectedIndex].githubAccount}
            onClose={() => setShowProfilePopup(false)}
          />
        )}

        <Popup
          isOpen={isProfilePopupOpen}
          onClose={() => setProfilePopupOpen(false)}
          variant="MYPAGE"
          userName={user?.name}
          generationAndPart={
            user?.generation && user?.track
              ? `${user.generation}기 ${convertTrackToString(user.track)}`
              : "기수 정보 없음"
          }
          profileImg={user?.profileImageUrl} 
          hasLogout={true}       
        />
      </WhiteContentContainer>
  );
}
