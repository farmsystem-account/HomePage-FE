import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import * as S from "./cheer.styled";

export default function Cheer() {
  const { isMobile,isTablet } = useMediaQueries();

  // 예시 데이터
  const cheerData = [
    {
      id: 1,
      title: "이소은 님에게 칭찬해요!",
      content: "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
      sender: "백합 님",
      bgColor: "#FFF8E1", // 노란색 계열
    },
    {
      id: 2,
      title: "이소은 님에게 칭찬해요!",
      content: "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
      sender: "팜하니 님",
      bgColor: "#E3F2FD", // 파란색 계열
    },
    {
      id: 3,
      title: "이소은 님에게 칭찬해요!",
      content: "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
      sender: "팜하니 님",
      bgColor: "#FFC0CB", // 분홍색 계열
    },
    {
      id: 4,
      title: "이소은 님에게 칭찬해요!",
      content: "잘하고있다. 웹뷰에서는 세 줄까지 가능. 텍스트 가운데정렬. 넘어가면 ...ㅇㅇㅇㅇㅇㅇㅇㅇㄴㄴㄴ",
      sender: "팜하니 님",
      bgColor: "#FFC0CB", // 분홍색 계열
    },
  ];

  return (
    <S.CheerContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.CheerTitle>실시간 응원 현황</S.CheerTitle>
      <S.CheerCardWrapper $isMobile={isMobile} $isTablet={isTablet}>
        {cheerData.map((cheer) => (
          <S.CheerCard key={cheer.id} bgColor={cheer.bgColor} $isMobile={isMobile}>
            {/* 상단(수신자) */}
            <S.CheerHeader>
              <S.CheerAvatar />
              <S.CheerReceiverText>{cheer.title}</S.CheerReceiverText>
            </S.CheerHeader>

            {/* 중단(본문) */}
            <S.CheerContent>{cheer.content}</S.CheerContent>

            {/* 하단(발신자) */}
            <S.CheerFooter>{cheer.sender}</S.CheerFooter>
          </S.CheerCard>
        ))}
      </S.CheerCardWrapper>
    </S.CheerContainer>
  );
}
