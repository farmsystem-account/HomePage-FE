import { useEffect, useState } from 'react';
import * as S from './index.styles';
import useMediaQueries from '@/hooks/useMediaQueries';
import BackArrow from '../../assets/Icons/BackArrow.png';
import Phrase from '../../assets/Images/RankingPhrase.png';
import Phrase_App from '../../assets/Images/RankingPhrase_App.png';
import FarmLogo from '../../assets/Icons/FarmSystem_Logo.png';
import Crown from '../../assets/Icons/crown.png';
import Balloon from '../../assets/Images/Balloon.png';

const rankingData = [
  { rank: 4, name: '박파밍', track: '3기 보안/웹', score: 678, isMe: true },
  { rank: 1, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 2, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 3, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 4, name: '이소은', track: '3기 보안/웹', score: 678 },
  { rank: 5, name: '이소은', track: '3기 보안/웹', score: 678 },
];

export default function Main() {
    const { isMobile, isApp } = useMediaQueries();
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    // const listRef = useRef<HTMLDivElement>(null);

    const getBgColor = (rank: number) => {
      if (rank === 1) return '#5CD282'; 
      if (rank === 2) return '#7CDA9A';
      if (rank === 3) return '#ABE6BF';
      return '#D8D8D8'; 
    };

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          // 랭킹 아이템 내부에 'ranking-item' 클래스가 없으면 닫음
          if (!target.closest('.ranking-item')) {
            setSelectedIndex(null);
          }
        };
      
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
      }, []);
      
  
    return (
      <S.MyPageContainer>
        <S.ProfileWrapper isMobile={isMobile}>
          <S.TitleBox isMobile={isMobile}>
            <S.BackArrow src={BackArrow} />
            <S.Title>랭킹</S.Title>
          </S.TitleBox>
          <S.Phrase isApp={isApp} src={isApp ? Phrase_App : Phrase} />
  
          <S.RankingTitle isApp={isApp}>
            <S.RankingTitleText isApp={isApp}>순위</S.RankingTitleText>
            <S.RankingTitleText isApp={isApp}>이름/전공</S.RankingTitleText>
            <S.RankingTitleText isApp={isApp}>누적 씨앗 개수</S.RankingTitleText>
          </S.RankingTitle>
  
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
                {/* 풍선 이미지 조건부 렌더링 */}
                {selectedIndex === index && (
                  <S.Balloon src={Balloon} alt="말풍선" />
                )}
  
                <S.RankBox>
                  <S.RankNumber isApp={isApp}>{item.rank}</S.RankNumber>
                  {item.rank <= 3 && <S.CrownIcon src={Crown} alt="crown" />}
                </S.RankBox>
  
                <S.ProfileSection>
                  <S.ProfileIcon src={FarmLogo} />
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
      </S.MyPageContainer>
    );
  }