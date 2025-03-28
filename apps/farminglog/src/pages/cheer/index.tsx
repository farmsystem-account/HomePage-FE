import * as S from './index.styled';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import CheerCard from './CheerCard';
import Image from '../../../assets/Icons/FarmSystem_Logo.png';
import GoBackImage from '@/assets/Icons/corner-up-left.png';
import EditImage from '@/assets/Icons/edit-3.png';

export interface CheerData {
  id: number;
  r_profile: string;
  receiver: string;
  category: string;
  content: string;
  s_profile: string;
  sender: string;
  bgColor: string;
  fontColor: string;
}

// 예시 데이터: 각 카테고리별 폰트색과 배경색이 지정됨
const cheerData: CheerData[] = [
  {
    id: 1,
    r_profile: Image,
    receiver: "이소은",
    category: "칭찬해요!",
    content:
      "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
    s_profile: Image,
    sender: "백합",
    bgColor: "#FFF8E1", // 노란색 계열
    fontColor: "#A49900", // '칭찬해요!' 폰트색
  },
  {
    id: 2,
    r_profile: Image,
    receiver: "이소은",
    category: "감사해요!",
    content:
      "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
    s_profile: Image,
    sender: "팜하니",
    bgColor: "#E3F2FD", // 파란색 계열
    fontColor: "#1D5AB2", // '감사해요!' 폰트색
  },
  {
    id: 3,
    r_profile: Image,
    receiver: "이소은",
    category: "응원해요!",
    content:
      "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
    s_profile: Image,
    sender: "팜하니",
    bgColor: "#FFC0CB", // 분홍색 계열
    fontColor: "#E5435F", // '응원해요!' 폰트색
  },
  {
    id: 4,
    r_profile: Image,
    receiver: "이소은",
    category: "응원해요!",
    content:
      "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
    s_profile: Image,
    sender: "팜하니",
    bgColor: "#FFC0CB",
    fontColor: "#E5435F",
  },
];

export default function Cheer() {
  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();

  return (
    <S.FarmingLogContainer 
      $isApp={isApp} 
      $isMobile={isMobile} 
      $isTablet={isTablet} 
      $isDesktop={isDesktop}
    >
      {/* 헤더 영역 */}
      <S.FarmingLogContainerHeader 
        $isApp={isApp} 
        $isMobile={isMobile} 
        $isDesktop={isDesktop}
      >
        <S.GoBackButton 
          $isApp={isApp} 
          $isMobile={isMobile} 
          $isDesktop={isDesktop}
        >
          <img src={GoBackImage} alt="뒤로가기" />
        </S.GoBackButton>
        <S.FarmingLogContainerTitle 
          $isApp={isApp} 
          $isMobile={isMobile} 
          $isDesktop={isDesktop}
        >
          파밍 로그
        </S.FarmingLogContainerTitle>
      </S.FarmingLogContainerHeader>

      {/* CheerCard 목록 */}
      <S.FarmingLogCardContainer 
        $isApp={isApp} 
        $isMobile={isMobile} 
        $isDesktop={isDesktop}
      >
        {cheerData.map((cheer) => (
          <CheerCard key={cheer.id} cheer={cheer} />
        ))}
      </S.FarmingLogCardContainer>

      {/* 글쓰기 버튼 */}
      <S.FarmingLogWriteButton
        $isApp={isApp}
        $isMobile={isMobile}
        $isDesktop={isDesktop}
        onClick={() => navigate('/farminglog/create')}
      >
        <S.FarmingLogWriteButtonImage 
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
          src={EditImage} 
          alt="글쓰기" 
        />
      </S.FarmingLogWriteButton>
    </S.FarmingLogContainer>  
  );
}
