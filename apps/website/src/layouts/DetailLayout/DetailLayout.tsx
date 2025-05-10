import * as S from "./DetailLayout.styled";
import GoBackArrow from "@/assets/LeftArrow.png";

interface DetailLayoutProps {
  title?: string;
  content?: string;
  date?: string;
  tag?: string;
  thumbnailUrl?: string;
  imageUrls?: string[];
}

export default function DetailLayout({
  title = "(임시) 제목",
  content = "(임시) 내용",
  date = "(임시) 게시일자: 2025년 03월 13일",
  tag = "(임시) 태그",
  thumbnailUrl = "",
  // imageUrls = [],
}: DetailLayoutProps) {


  return (
      <S.DetailCard>
        <S.GoBackContainer>
          <S.GoBackButton onClick={() => window.history.back()}>
            <S.GoBackImg src={GoBackArrow} alt="Go back" />
            <p>돌아가기</p>
          </S.GoBackButton>
        </S.GoBackContainer>
        <S.TitleContainer>
          <S.DateAndTagContainer>
            <S.Date>{date}</S.Date>
            <S.Tag>{tag}</S.Tag>
          </S.DateAndTagContainer>
          <S.Title>{title}</S.Title>
        </S.TitleContainer>
        <S.ImageContainer>
          <S.Thumbnail src={thumbnailUrl} alt={title} />
        </S.ImageContainer>
        <S.ContentBox>{content}</S.ContentBox>
      </S.DetailCard>
  );
}