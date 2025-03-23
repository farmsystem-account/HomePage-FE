import * as S from './index.styled';
import PinIcon from '@/assets/icons/x.svg';
import Polygon from '@/assets/icons/polygon-1.svg';

export default function Editor() {
  return (
    <S.FarmingLogEditorContainer>
      {/* Header 섹션 */}
      <S.FarmingLogEditorContainerHeader>
        <S.HeaderPinContainer>
          <S.HeaderPin>
            <S.HeaderPinIcon src={PinIcon} alt="pin" />
          </S.HeaderPin>
          <S.HeaderPin>
            <S.HeaderPinIcon src={PinIcon} alt="pin" />
          </S.HeaderPin>
        </S.HeaderPinContainer>
        <S.HeaderContext>
          <p><S.HeaderContextBold>파밍로그</S.HeaderContextBold>는 매일 자신이 배운 내용을</p>
          <p>기록하는 공간입니다. 농장에서 작물을 가꾸듯,</p>
          <p>여러분의 지식과 경험을 쑥쑥 길러보세요!</p>
        </S.HeaderContext>
      </S.FarmingLogEditorContainerHeader>

      {/* 에디터 섹션 */}
      <S.FarmingLogCard>
        <S.Thumbnail alt="thumbnail" />
        <S.ContentContainer>
          <S.CategoryContainer>
            <S.Category>
              <S.CategoryText>카테고리</S.CategoryText>
              <img src={Polygon} alt="polygon" />
            </S.Category>
          </S.CategoryContainer>
        </S.ContentContainer>
      </S.FarmingLogCard>
    </S.FarmingLogEditorContainer>
  );
};