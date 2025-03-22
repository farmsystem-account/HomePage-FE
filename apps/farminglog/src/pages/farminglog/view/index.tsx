import * as S from './index.styled';
import GoBack from '@/assets/icons/corner-up-left.svg';
import BlankImage from '@/assets/images/blank-image.png';
import Card from './Card';

const dummyData = [
  {
    farmingLogId: 90,
    title: "string",
    content: "팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다.",
    category: "string",
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
    title: "string",
    thumbnail: BlankImage,
    content: "팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. ...팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. 팜시스템에 필요한 모든 정보를 담은 앱! W-300 H-HugContents로 5줄까지 소개가 가능하다. 5줄을 적으면 150자이다. ...",
    category: "string",
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

export default  function index() {
  return (
    <S.FarmingLogContainer>
      <S.FarmingLogContainerHeader>
        <S.GoBackButton>
          <img src={GoBack} alt="뒤로가기" />
        </S.GoBackButton>
        <S.FarmingLogContainerTitle>파밍 로그</S.FarmingLogContainerTitle>
      </S.FarmingLogContainerHeader>
      <S.FarmingLogCardContainer>
        {dummyData.map((data, idx) => (
          <Card key={idx} data={data} />
        ))}
      </S.FarmingLogCardContainer>
    </S.FarmingLogContainer>  
  );
};