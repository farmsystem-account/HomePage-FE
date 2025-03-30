import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
// 예시로 FarmSystem_Logo.png를 프로필로 사용
import Image from "../../../assets/Icons/FarmSystem_Logo.png";
import * as S from "./cheer.styled";

export default function Cheer() {
  const { isMobile, isTablet } = useMediaQueries();

  // 예시 데이터 (각 카테고리에 따라 폰트색과 배경색을 함께 지정)
  const cheerData = [
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
      fontColor: "#A49900", // "칭찬해요!" 폰트색
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
      fontColor: "#1D5AB2", // "감사해요!" 폰트색
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
      fontColor: "#E5435F", // "응원해요!" 폰트색
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
      bgColor: "#FFC0CB", // 예시 bgColor (응원해요)
      fontColor: "#E5435F", // "응원해요!" 폰트색
    },
  ];

  return (
    <S.CheerContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.CheerTitle $isMobile={isMobile}>실시간 응원 현황</S.CheerTitle>

      <S.CheerCardWrapper $isMobile={isMobile} $isTablet={isTablet}>
        {cheerData.map((cheer) => (
          <S.CheerCard
            key={cheer.id}
            bgColor={cheer.bgColor}
            $isMobile={isMobile}
          >
            {/* 상단(수신자) */}
            <S.CheerHeader $isMobile={isMobile} >
              {/* 실제 프로필 이미지를 표시하도록 img 태그 사용 */}
              <S.CheerAvatar src={cheer.r_profile} alt="profile" $isMobile={isMobile} />
              <S.CheerReceiverText $isMobile={isMobile} >
                <a>{cheer.receiver}</a> 님에게&nbsp; <a><S.CheerColorText categoryColor={cheer.fontColor} $isMobile={isMobile}>{cheer.category}</S.CheerColorText></a>
              </S.CheerReceiverText>
            </S.CheerHeader>

            {/* 중단(본문) */}
            <S.CheerContent $isMobile={isMobile} >{cheer.content}</S.CheerContent>

            {/* 하단(발신자) */}
            <S.CheerFooter $isMobile={isMobile} >
              <S.CheerAvatar src={cheer.s_profile} alt="profile" $isMobile={isMobile}  />
                <a>{cheer.sender}</a>&nbsp;님
            </S.CheerFooter>
          </S.CheerCard>
        ))}
      </S.CheerCardWrapper>
    </S.CheerContainer>
  );
}
