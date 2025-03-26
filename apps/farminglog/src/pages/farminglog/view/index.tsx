import * as S from './index.styled';
import Card from './Card';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';

import GoBackImage from '@/assets/Icons/corner-up-left.png';
// import BlankImage from '@/assets/images/blank-image.png';
import EditImage from '@/assets/Icons/edit-3.png';


const dummyData = [
  {
    farmingLogId: 90,
    title: "제제제제제제제제제목",
    content: "팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다.",
    category: "프로젝트",
    createdAt: "string",
    author: "string",
    profileImageUrl: "string",
    track: "string",
    generation: 1073741824,
    isOwner: true,
    isLiked: true,
    likeCount: 130
  },
  {
    farmingLogId: 80,
    title: "",
    // thumbnail: BlankImage,
    content: "팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. ...팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. ...",
    category: "해커톤",
    createdAt: "string",
    author: "string",
    profileImageUrl: "string",
    track: "string",
    generation: 1073741824,
    isOwner: false,
    isLiked: false,
    likeCount: 90
  }
];

export default  function View() {
  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();

  return (
    <S.FarmingLogContainer $isApp={isApp} $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
      <S.FarmingLogContainerHeader $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
        <S.GoBackButton $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
          <img src={GoBackImage} alt="뒤로가기" />
        </S.GoBackButton>
        <S.FarmingLogContainerTitle  $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
          파밍 로그
          </S.FarmingLogContainerTitle>
      </S.FarmingLogContainerHeader>
      <S.FarmingLogCardContainer  $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
        {dummyData.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </S.FarmingLogCardContainer>
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
};