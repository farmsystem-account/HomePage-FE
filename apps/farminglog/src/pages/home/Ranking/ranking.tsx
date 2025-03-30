import { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import * as S from './ranking.styled'; // 유지
import useMediaQueries from '@/hooks/useMediaQueries';

// 이미지 import도 유지
import UpArrowImg from '@/assets/Icons/UpArrow.png';
import FarmLogoImg from '@/assets/Icons/FarmSystem_Logo.png';
import CrownImg from '@/assets/Icons/crown.png';

import { useUserRankingQuery } from '@/services/query/useUserRankingQuery'; // 실제 데이터 호출

export default function RankingPreview() {
  const navigate = useNavigate();
  const { isMobile, isApp, isTablet } = useMediaQueries();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const { data, isLoading } = useUserRankingQuery();

  const getBgColor = (rank: number) => {
    if (rank === 1) return '#5CD282';
    if (rank === 2) return '#7CDA9A';
    if (rank === 3) return '#ABE6BF';
    return '#D8D8D8';
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.ranking-item')) {
        setSelectedIndex(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (isLoading || !data) return null; // 로딩 처리 간단히 유지

  // 내 랭킹 + 상위 3명만 표시
  const previewRankingData = [
    data.myRank,
    ...data.userRankList.slice(0, 3),
  ];

  return (
    <S.ProfileWrapper $isMobile={isMobile} $isTablet={isTablet}>
      {/* 기존 디자인 유지 */}
      <S.TitleBox $isMobile={isMobile} $isTablet={isTablet}>
        <S.Title $isMobile={isMobile}>랭킹</S.Title>
        <S.BackArrow
          src={UpArrowImg}
          alt="확대하기"
          onClick={() => navigate("/rankingDetail")}
        />
      </S.TitleBox>

      <S.PhaseDesc $isMobile={isMobile}>
        · 랭킹은 씨앗을 기준으로 0시간마다 정렬돼요.<br />
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
            onClick={() => setSelectedIndex(index)}
          >
            {selectedIndex === index && <></>} {/* 풍선 등 유지 */}

            <S.RankBox>
              <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
              {item.rank <= 3 && <S.CrownIcon src={CrownImg} alt="왕관" />}
            </S.RankBox>

            <S.ProfileSection>
              <S.ProfileIcon src={item.profileImageUrl || FarmLogoImg} alt="프로필 아이콘" />
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
    </S.ProfileWrapper>
  );
}
