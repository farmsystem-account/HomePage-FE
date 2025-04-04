import { useState } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useNavigate } from 'react-router';
import * as S from './cheer.styled';
import MessagePopup from '@/components/Popup/MessagePopup';

// import { useUserStore } from '@repo/auth/stores/userStore';
import { useUserInfoQuery } from '@repo/auth/services/query/useUserInfoQuery';
import { useCheerMutation } from '@/services/mutation/useCheerMutation';
import { useQueryClient } from '@tanstack/react-query';

const tagMap = {
  '칭찬해요!': 'COMPLIMENT',
  '감사해요!': 'THANK',
  '응원해요!': 'CHEER',
} as const;

type CategoryName = keyof typeof tagMap;

const categories = [
  { name: '칭찬해요!', bgColor: '#FFF9A5', fontColor: '#A49900' },
  { name: '감사해요!', bgColor: '#8FB7F2', fontColor: '#1D5AB2' },
  { name: '응원해요!', bgColor: '#FFC0CB', fontColor: '#E5435F' },
] as const;

interface CheerMessageEditorProps {
  searchedUser: {
    name: string;
    userId: number;
  };
}

export default function CheerMessageEditor({ searchedUser }: CheerMessageEditorProps) {
  const [contentInput, setContentInput] = useState('');
  const [contentCount, setContentCount] = useState(0);
  const { userId: cheeredId } = searchedUser;

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState<{ main: string; sub?: string }>({ main: '', sub: '' });
 

  const [selectedCategory, setSelectedCategory] = useState<{
    name: CategoryName;
    bgColor?: string;
    fontColor?: string;
  } | null>(null);

  const isButtonDisabled = contentCount < 20;

  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  const queryClient = useQueryClient();

  // const { user } = useUserStore((s) => s); // 로그인한 유저 정보
  const { mutate: sendCheer } = useCheerMutation(); // 응원 API
  const { data: user } = useUserInfoQuery();


  const handleCategoryClick = (cat: { name: CategoryName; bgColor: string; fontColor?: string }) => {
    setSelectedCategory(cat);
  };

 const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
  const textarea = e.target;
  setContentInput(textarea.value);
  setContentCount(textarea.value.length);

  // 기본 높이보다 클 때만 늘림
  const baseHeight = 100; // 기본 높이(px)
  textarea.style.height = `${baseHeight}px`; // 초기화
  const newHeight = Math.min(textarea.scrollHeight, 300); // (선택) 최대 높이 제한
  textarea.style.height = `${newHeight}px`;
};


const handleSubmit = () => {
  if (!user?.userId) return;

  if (!selectedCategory) {
    setPopupMessage({
      main: '당신의 응원이 더욱 따뜻하게 전달될 수 있도록,',
      sub: '칭찬, 감사, 응원 중 하나를 선택해 주세요!',
    });
    setPopupOpen(true);
    return;
  }

  if (contentCount < 20) {
    setPopupMessage({
      main: '따뜻한 응원은 길수록 좋아요.',
      sub: '최소 20자 이상 입력해야 전송할 수 있어요!',
    });
    setPopupOpen(true);
    return;
  }

  sendCheer(
  {
    cheererId: user.userId,
    cheeredId,
    tag: tagMap[selectedCategory.name],
    content: contentInput,
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cheerList'] });
      setPopupMessage({
        main: '전송이 완료되었어요.',
        sub: '씨앗 2개 획득!',
      });
      setPopupOpen(true);
    },
    onError: (error: any) => {
      if (error?.status === 400) {
        setPopupMessage({
          main: '본인이 아닌 다른 사람을 응원해주세요!',
        });
        setPopupOpen(true);
      } else {
        console.error('예상치 못한 에러:', error);
      }
    },
  }
);
};

  return (
    <>
      <S.HeaderText $isApp={isApp} $isMobile={isMobile}>
        {searchedUser.name} 님에게
      </S.HeaderText>
      <S.MainTitle $isMobile={isMobile}>응원 메시지를 남겨볼까요?</S.MainTitle>

      <S.CheerCard $isApp={isApp} $isMobile={isMobile} $isDesktop={isDesktop}>
        <S.ContentWrapper $isApp={isApp} $isMobile={isMobile}>
          <a>To. {searchedUser.name}</a>

          <S.CategoryContainer>
            {categories.map((cat) => (
              <S.CategoryItem
                key={cat.name}
                $isApp={isApp}
                $isMobile={isMobile}
                $isTablet={isTablet}
                $isDesktop={isDesktop}
                onClick={() => handleCategoryClick(cat)}
                $isSelected={selectedCategory?.name === cat.name}
                $fontColor={cat.fontColor}
                $bgColor={cat.bgColor}
              >
                {cat.name}
              </S.CategoryItem>
            ))}
          </S.CategoryContainer>

          <S.InputArea $isApp={isApp} $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
            <S.InputHeader>
              <S.InputTitleContainer>
                <S.SmallText $isApp={isApp}>{contentCount}/180자</S.SmallText>
              </S.InputTitleContainer>
              <S.SmallText $isApp={isApp}>* 20자 이상 작성</S.SmallText>
            </S.InputHeader>

            <S.MessageTextarea
              $bgColor={selectedCategory?.bgColor}
              value={contentInput}
              onChange={handleContentChange}
              placeholder="여기에 응원 메시지를 작성해주세요!"
              maxLength={180}
            />
          </S.InputArea>

          <S.SubmitButton $isMobile={isMobile} $isTablet={isTablet} disabled={isButtonDisabled} $disabled={isButtonDisabled} onClick={handleSubmit}>
            응원하기
          </S.SubmitButton>
        </S.ContentWrapper>
      </S.CheerCard>

      {popupOpen && (
        <MessagePopup
          mainMessage={popupMessage.main}
          subMessage={popupMessage.sub}
          isMobile={isMobile}
          onClose={() => {
            setPopupOpen(false);
              if (popupMessage.main === '전송이 완료되었어요.') {
               navigate('/cheer');
            }

              if (popupMessage.main === '본인이 아닌 다른 사람을 응원해주세요!') {
                navigate('/cheer');
            }
          }}
        />
      )}
    </>
  );
}
