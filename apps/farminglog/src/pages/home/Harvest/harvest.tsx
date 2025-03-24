// harvest.tsx
import useMediaQueries from "../../../../../website/src/hooks/useMediaQueries";
import terminal from "@/assets/home/terminal.png";
import thumb from "@/assets/home/thumbs-up.png";
import edit from "@/assets/home/edit.png";
import * as S from "./harvest.styled";

export interface StageProps {
  text: string;
  image: string;
  link: string;
  buttonText: string;
  onClick: () => void;
}

const stages: StageProps[] = [
  {
    text: "출석체크",
    image: terminal,
    link: "/",
    buttonText: "출석하기",
    onClick: () => {
      console.log("출석체크 클릭");
    },
  },
  {
    text: "응원하기",
    image: thumb,
    link: "/",
    buttonText: "응원하기",
    onClick: () => {
      console.log("응원하기 클릭");
    },
  },
  {
    text: "로그 작성",
    image: edit,
    link: "/",
    buttonText: "로그 작성",
    onClick: () => {
      console.log("로그 작성 클릭");
    },
  },
];

export default function Harvest() {
  const { isMobile, isTablet } = useMediaQueries();

  return (
    <S.HarvestContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.MainText $isMobile={isMobile} $isTablet={isTablet}>씨앗 모으기</S.MainText>
      <S.SubText $isMobile={isMobile} $isTablet={isTablet}>
        매일 버튼을 눌러 출석 체크를 하거나,
        <br />
        다양한 활동에 참여하여 씨앗을 모아보세요!
      </S.SubText>

      {/* 버튼 리스트 */}
      <S.ButtonContainer $isMobile={isMobile} $isTablet={isTablet}>
        {stages.map((stage, index) => (
          <S.StageButton key={index} onClick={stage.onClick} $isMobile={isMobile} $isTablet={isTablet}>
            {/* 원형 div 안에 20×20px 이미지를 배치 */}
            <S.ButtonIcon $isMobile={isMobile} $isTablet={isTablet}>
              <S.IconImg src={stage.image} alt={stage.text} $isMobile={isMobile} $isTablet={isTablet} />
            </S.ButtonIcon>
            <S.ButtonLabel $isMobile={isMobile} $isTablet={isTablet}>{stage.buttonText}</S.ButtonLabel>
          </S.StageButton>
        ))}
      </S.ButtonContainer>
    </S.HarvestContainer>
  );
}
