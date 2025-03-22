import * as S from './index.styled';
import GoBack from '@/assets/icons/corner-up-left.svg';
// import BlankImage from '@/assets/images/blank-image.png';

// const dummyData = [
//   {
//     title: '파밍 로그 제목',
//     thumbnail: BlankImage,
//   }
// ];

export default  function index() {
  return (
    <S.FarmingLogContainer>
      <S.FarmingLogContainerHeader>
        <S.GoBackButton>
          <img src={GoBack} alt="뒤로가기" />
        </S.GoBackButton>
        <S.FarmingLogContainerTitle>파밍 로그</S.FarmingLogContainerTitle>
      </S.FarmingLogContainerHeader>
      
      <S.Thumbnail src="/images/" alt="썸네일" />
    </S.FarmingLogContainer>  
  );
};