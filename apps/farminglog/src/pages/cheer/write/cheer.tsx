import { useState } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useNavigate } from "react-router";
import * as S from './cheer.styled';

// 아이콘 예시
import GoBackImage from '@/assets/Icons/corner-up-left.png';

/** 카테고리 목록: 배경색(bgColor), 폰트색(fontColor)을 함께 정의 */
const categories = [
  { name: '칭찬해요!', bgColor: '#FFF9A5', fontColor: '#A49900' },
  { name: '감사해요!', bgColor: '#8FB7F2', fontColor: '#1D5AB2' },
  { name: '응원해요!',  bgColor: '#FFC0CB', fontColor: '#E5435F' },
] as const;

interface CheerMessageEditorProps {
  /** 검색으로 선택된 유저 이름 */
  searchedUser: string;
}

export default function CheerMessageEditor({ searchedUser }: CheerMessageEditorProps) {
  // 메시지 입력값 & 글자수
  const [contentInput, setContentInput] = useState('');
  const [contentCount, setContentCount] = useState(0);
  const navigate = useNavigate();

  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    bgColor?: string;
    fontColor?: string;
  } | null>(null);

  // 100자 이상 작성 시 버튼 활성
  const isButtonDisabled = contentCount < 100;

  // 반응형 훅
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();

  /** 카테고리 클릭 */
  const handleCategoryClick = (cat: { name: string; bgColor: string; fontColor?: string }) => {
    setSelectedCategory(cat);
  };

  /** 메시지 입력 */
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContentInput(e.target.value);
    setContentCount(e.target.value.length);
  };

  return (
    <S.CheerContainer
      $isApp={isApp}
      $isMobile={isMobile}
      $isTablet={isTablet}
      $isDesktop={isDesktop}
    >
      {/* 헤더 영역 */}
      <S.CheerContainerHeader
        $isApp={isApp}
        $isMobile={isMobile}
        $isDesktop={isDesktop}
      >
        <S.GoBackButton $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop} 
           onClick={() => navigate('/cheer/')}
           >
          <img src={GoBackImage} alt="뒤로가기" />
        </S.GoBackButton>

        <S.CheerContainerTitle
          $isApp={isApp}
          $isMobile={isMobile}
          $isDesktop={isDesktop}
        >
          응원하기
        </S.CheerContainerTitle>
      </S.CheerContainerHeader>

      {/* "xxx 님에게" */}
      <S.HeaderText $isApp={isApp} $isMobile={isMobile}>
        {searchedUser} 님에게
      </S.HeaderText>
      <S.MainTitle>응원 메시지를 남겨볼까요?</S.MainTitle>

      {/* 메인 카드 영역 */}
      <S.CheerCard $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
        <S.ContentWrapper $isApp={isApp} $isMobile={isMobile}>
          {/* "To. {searchedUser}" */}
          <a>To. {searchedUser}</a>
          {/* 카테고리 버튼 */}
          <S.CategoryContainer>
            {categories.map((cat) => (
              <S.CategoryItem
                key={cat.name}
                $isApp={isApp}
                $isMobile={isMobile}
                $isTablet={isTablet}
                $isDesktop={isDesktop}
                onClick={() => handleCategoryClick(cat)}
                // 현재 선택된 카테고리와 비교해 선택 여부 결정
                $isSelected={selectedCategory?.name === cat.name}
                // 폰트 색상 prop
                $fontColor={cat.fontColor}
                $bgColor={cat.bgColor}
              >
                {cat.name}
              </S.CategoryItem>
            ))}
          </S.CategoryContainer>

          {/* 메시지 입력란 */}
          <S.InputArea $isApp={isApp}>
            <S.InputHeader>
              <S.InputTitleContainer>
                <S.SmallText $isApp={isApp}>
                  {contentCount}/180자
                </S.SmallText>
              </S.InputTitleContainer>
              <S.SmallText $isApp={isApp}>
                * 100자 이상 작성
              </S.SmallText>
            </S.InputHeader>

            <S.MessageTextarea
              // 카테고리별 배경색
              $bgColor={selectedCategory?.bgColor}
              value={contentInput}
              onChange={handleContentChange}
              placeholder="여기에 응원 메시지를 작성해주세요!"
              maxLength={180} 
            />
          </S.InputArea>

          {/* 응원하기 버튼 (100자 이상 작성 시 활성) */}
          <S.SubmitButton $disabled={isButtonDisabled} disabled={isButtonDisabled}>
            응원하기
          </S.SubmitButton>
        </S.ContentWrapper>
      </S.CheerCard>
    </S.CheerContainer>
  );
}
