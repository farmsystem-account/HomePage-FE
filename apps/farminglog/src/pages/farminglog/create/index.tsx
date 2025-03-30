import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import * as S from './index.styled';
import { 
  FarmingLogCategory,
  FarmingLogCategoryDisplayMapping
} from '@/models/farminglog';
import { 
  useCreateFarmingLogMutation,
  useEditFarmingLogMutation
} from '@/services/mutation/FarmingLog';
import useFarmingLogStore from '@/stores/farminglogStore';
// import Popup from '@/components/Popup/popup';

import PinIcon from '@/assets/Icons/x.png';
import Polygon from '@/assets/Icons/polygon-1.png';


const categoryList = Object.keys(FarmingLogCategory) as Array<keyof typeof FarmingLogCategory>;

export default function Editor() {
  const [titleInput, setTitleInput] = useState('');
  const [titleCount, setTitleCount] = useState(0);
  const [contentInput, setContentInput] = useState('');
  const [contentCount, setContentCount] = useState(0);

  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [dropDownSelected, setDropDownSelected] = useState<keyof typeof FarmingLogCategory | null>(null);
  // const [popUpOpen, setPopupOpen] = useState(false);
  // const [popUpText, setPopUpText] = useState<string[]>(['', '']);

  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  const { mutate: createFarmingLogMutate } = useCreateFarmingLogMutation();
  const { mutate: editFarmingLogMutate } = useEditFarmingLogMutation();
  const {
    isEditMode,
    farmingLogId,
    farminglogTitle,
    farminglogContent,
    farminglogCategory,
    setIsEditMode,
  } = useFarmingLogStore();

  useEffect(() => {
    if (isEditMode) {
      setTitleInput(farminglogTitle);
      setTitleCount(farminglogTitle.length);
      setContentInput(farminglogContent);
      setContentCount(farminglogContent.length);
      setDropDownSelected(farminglogCategory as keyof typeof FarmingLogCategory);
    }
  }
  , [isEditMode, farminglogTitle, farminglogContent, farminglogCategory]);

  const handleCreateFarmingLog = () => {
    console.log('제목:', titleInput);
    console.log('내용:', contentInput);

    if (dropDownSelected === null) {
      alert('카테고리를 선택해주세요.');
      return;
    }

    const categoryEnum = FarmingLogCategory[dropDownSelected];
    console.log('카테고리:', categoryEnum);

    if (titleCount < 1 || titleCount > 20) {
      // setPopupOpen(true);
      // setPopUpText(['제목이 너무 길어요.', '1자 이상, 20자 이하로 작성해주세요.']);
      alert('제목이 너무 길어요. 1자 이상, 20자 이하로 작성해주세요.');
      return;
    }
    if (contentCount < 100) {
      // setPopupOpen(true);
      // setPopUpText(['회원님의 이야기를 더 듣고 싶어요.', '내용을 100자 이상 작성해주세요.']);
      alert('회원님의 이야기를 더 듣고 싶어요. 내용은 100자 이상 작성해주세요.');
      return;
    }
    if (contentCount > 300) {
      // setPopupOpen(true);
      // setPopUpText(['내용이 너무 길어요.', '300자 이하로 작성해주세요.']);
      alert('내용이 너무 길어요. 300자 이하로 작성해주세요.');
      return;
    }
    if (isEditMode) {
      // 수정 모드일 때

      if (farmingLogId === null) {
        alert('잘못된 접근입니다.');
        return;
      }
      editFarmingLogMutate({
        farminglogId: farmingLogId,
        title: titleInput,
        content: contentInput,
        category: categoryEnum,
      });

      setIsEditMode(false);
      // setPopupOpen(true);
      // setPopUpText(['안내', '수정이 완료되었습니다.']);
      alert('수정이 완료되었습니다.');
    } else {
      createFarmingLogMutate({
        title: titleInput,
        content: contentInput,
        category: categoryEnum,
      });
      // setPopupOpen(true);
      // setPopUpText(['안내', '파밍로그 작성 완료되었습니다.']);
      alert('파밍로그 작성 완료되었습니다.');
    }
    navigate('/farminglog/view');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const toggleDropdown = () => {
    setIsDropDownOpen((prev) => !prev);
  };

  const getCurrentTimeFormatedString = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');

    return `${year}/${month}/${day} ${hours}:${minutes}`;
  };

  return (
    <S.MainContainer>
      <S.FarmingLogEditorContainer
        $isApp={isApp}
        $isMobile={isMobile}
        $isTablet={isTablet}
        $isDesktop={isDesktop}
      >
        {/* Header 섹션 */}
        <S.FarmingLogEditorContainerHeader $isApp={isApp} $isMobile={isMobile}>
          <S.HeaderPinContainer $isApp={isApp}>
            <S.HeaderPin $isApp={isApp}>
              <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
            </S.HeaderPin>
            <S.HeaderPin $isApp={isApp}>
              <S.HeaderPinIcon $isApp={isApp} src={PinIcon} alt="pin" />
            </S.HeaderPin>
          </S.HeaderPinContainer>
          <S.HeaderContext $isApp={isApp} $isMobile={isMobile}>
            <p>
              <S.HeaderContextBold>파밍로그</S.HeaderContextBold>는 매일 자신이 배운 내용을
            </p>
            <p>기록하는 공간입니다. 농장에서 작물을 가꾸듯,</p>
            <p>여러분의 지식과 경험을 쑥쑥 길러보세요!</p>
          </S.HeaderContext>
        </S.FarmingLogEditorContainerHeader>

        {/* 에디터 섹션 */}
        <S.FarmingLogCard $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
          {/* 카테고리 */}
          <S.ContentContainer $isApp={isApp} $isMobile={isMobile}>
            <S.CategoryContainer onClick={toggleDropdown}>
              <S.CategorySelect $isApp={isApp}>
                <S.CategoryText $isApp={isApp} $isMobile={isMobile}>
                  {dropDownSelected ? FarmingLogCategoryDisplayMapping[dropDownSelected] : '카테고리'}
                </S.CategoryText>
                <img src={Polygon} alt="polygon" style={{ width: '7px', height: '6px' }} />
              </S.CategorySelect>
              {isDropDownOpen && (
                <S.CategoryOptionContainer $isApp={isApp}>
                  {categoryList.map((categoryKey) => (
                    <S.CategoryOption
                      key={categoryKey}
                      onClick={() => {
                        setDropDownSelected(categoryKey);
                      }}
                      $isApp={isApp}
                    >
                      {FarmingLogCategoryDisplayMapping[categoryKey]}
                    </S.CategoryOption>
                  ))}
                </S.CategoryOptionContainer>
              )}
            </S.CategoryContainer>

            {/* 제목 */}
            <S.InputAndTextContainer $isApp={isApp}>
              <S.TitleContainer $isApp={isApp}>
                <S.TitleText $isApp={isApp} $isMobile={isMobile}>제목</S.TitleText>
                <S.SmallText $isApp={isApp} $isMobile={isMobile}>{titleCount + '/20자'}</S.SmallText>
              </S.TitleContainer>
              <S.InputBox
                value={titleInput}
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  setTitleCount(e.target.value.length);
                }}
                placeholder="내용을 입력해주세요."
                $isApp={isApp}
                $isMobile={isMobile}
              />
            </S.InputAndTextContainer>

            {/* 날짜 */}
            {isApp && (
              <S.DateContainer>
                <S.DateText>{getCurrentTimeFormatedString()}</S.DateText>
              </S.DateContainer>
            )}

            {/* 내용 */}
            <S.InputAndTextContainer $isApp={isApp}>
              <S.TitleContainer $isApp={isApp}>
                <S.TitleTextContainer $isApp={isApp}>
                  <S.TitleText $isApp={isApp}>내용</S.TitleText>
                  <S.SmallText $isApp={isApp}>*100자 이상 작성</S.SmallText>
                </S.TitleTextContainer>
                <S.SmallText $isApp={isApp}>{contentCount + '/300자'}</S.SmallText>
              </S.TitleContainer>
              <S.TextArea
                value={contentInput}
                onChange={(e) => {
                  setContentInput(e.target.value);
                  setContentCount(e.target.value.length);
                }}
                placeholder="내용을 입력해주세요."
                $isApp={isApp}
                $isMobile={isMobile}
              />
            </S.InputAndTextContainer>
          </S.ContentContainer>
        </S.FarmingLogCard>

        {/* 버튼 섹션 */}
        <S.ButtonContainer $isApp={isApp} $isMobile={isMobile}>
          <S.GoBackButton onClick={handleGoBack} $isApp={isApp}>
            <S.ButtonEnnerText $isApp={isApp} $isMobile={isMobile}>
              돌아가기
            </S.ButtonEnnerText>
          </S.GoBackButton>
          <S.CreateButton onClick={handleCreateFarmingLog} $isApp={isApp}>
            <S.ButtonEnnerText $isApp={isApp} $isMobile={isMobile}>
              작성 완료
            </S.ButtonEnnerText>
          </S.CreateButton>
        </S.ButtonContainer>
      </S.FarmingLogEditorContainer>
      {/* {popUpOpen && (
        <Popup
          isOpen={popUpOpen}
          variant='MESSAGE'
          onClose={() => setPopupOpen(false)}
          mainMessage={popUpText[0]}
          subMessage={popUpText[1]}
          confirmLabel='확인'
        />
      )} */}
    </S.MainContainer>
  );
}