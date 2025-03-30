import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import * as S from './ranking.styled'; // 실제 경로에 맞게 수정
import useMediaQueries from '@/hooks/useMediaQueries';

// 이미지 경로도 실제 경로에 맞게 import
import UpArrowImg from '@/assets/Icons/UpArrow.png';
import FarmLogoImg from '@/assets/Icons/FarmSystem_Logo.png';
import CrownImg from '@/assets/Icons/crown.png';
// import BalloonImg from '@/assets/Images/Balloon.png';

interface RankingData {
  rank: number;
  name: string;
  track: string;
  score: number;
  isMe?: boolean;
}

const rankingData: RankingData[] = [
  { rank: 4, name: '박파밍', track: '3기 보안/웹', score: 678, isMe: true },
  { rank: 1, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 2, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 3, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 4, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 5, name: '이소은', track: '3기 보안/웹', score: 678 },
];

export default function RankingPage() {
  const navigate = useNavigate();
  const { isMobile, isApp, isTablet} = useMediaQueries();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getBgColor = (rank: number) => {
    if (rank === 1) return '#5CD282';
    if (rank === 2) return '#7CDA9A';
    if (rank === 3) return '#ABE6BF';
    return '#D8D8D8';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // ranking-item 영역 바깥을 클릭하면 말풍선 닫기
      if (!target.closest('.ranking-item')) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
      <S.ProfileWrapper $isMobile={isMobile} $isTablet={isTablet}>
        {/* 상단 영역 */}
        <S.TitleBox $isMobile={isMobile} $isTablet={isTablet}>
          <S.Title $isMobile={isMobile}>랭킹</S.Title>
          <S.BackArrow src={UpArrowImg} alt="확대하기" onClick={() => navigate("/rankingDetail")}/>
        </S.TitleBox>

        {/* 랭킹 문구 */}
        <S.PhaseDesc $isMobile={isMobile}>
          · 랭킹은 씨앗을 기준으로 0시간마다 정렬돼요.<br />
          · 씨앗은 트랙별 우수활동자 심사에 반영돼요.
        </S.PhaseDesc>


        {/* 헤더 영역 (순위, 이름/전공, 누적 씨앗 개수) */}
        <S.RankingTitle isApp={isApp}>
          <S.RankingTitleText isApp={isApp}>순위</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>이름/전공</S.RankingTitleText>
          <S.RankingTitleText isApp={isApp}>누적 씨앗 개수</S.RankingTitleText>
        </S.RankingTitle>

        {/* 실제 랭킹 리스트 */}
        <S.RankingList>
          {rankingData.map((item, index) => (
            <S.RankingItem
              key={index}
              className="ranking-item"
              bgColor={getBgColor(item.rank)}
              isMe={item.isMe}
              isApp={isApp}
              onClick={() => setSelectedIndex(index)}
            >
              {/* 선택된 아이템에만 풍선 표시 */}
              {selectedIndex === index && (
                <></>
              )}

              <S.RankBox>
                <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
                {item.rank <= 3 && <S.CrownIcon src={CrownImg} alt="왕관" />}
              </S.RankBox>

              <S.ProfileSection>
                <S.ProfileIcon src={FarmLogoImg} alt="프로필 아이콘" />
                <S.ColumnBox>
                  <S.Name isApp={isApp}>{item.name}</S.Name>
                  <S.Track isApp={isApp}>{item.track}</S.Track>
                </S.ColumnBox>
              </S.ProfileSection>

              <S.Score isApp={isApp}>{item.score}</S.Score>
            </S.RankingItem>
          ))}
        </S.RankingList>
      </S.ProfileWrapper>
  );
}
