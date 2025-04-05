import useMediaQueries from "@/hooks/useMediaQueries";
import { useNavigate } from 'react-router';
import * as S from "./cheer.styled";
import { useCheerListQuery } from "@/services/query/useCheerListQuery";
import { convertTagToCategory } from "@/utils/convertTagToCategory";
import FarmLogoImg from "../../../assets/Icons/FarmSystem_Logo.png"; // 유지된 이미지 import
import UpArrowImg from '@/assets/Icons/UpArrow.png';

export default function CheerPreview() {
  const navigate = useNavigate();
  const { isMobile, isTablet } = useMediaQueries();
  const { data: cheerList = [] } = useCheerListQuery();

  // 홈화면 미리보기로 최대 5개만 보여줌
  const previewCheerData = cheerList.slice(0, 5).map((item) => {
    const categoryData = convertTagToCategory(item.tag);

    return {
      id: item.cheerId,
      r_profile: item.cheered.profileImageUrl,
      receiver: item.cheered.name,
      category: categoryData.name,
      content: item.content,
      s_profile: item.cheerer.profileImageUrl,
      sender: item.cheerer.name,
      bgColor: categoryData.bgColor,
      fontColor: categoryData.fontColor,
    };
  });

  return (
    <S.CheerContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.TitleBox $isMobile={isMobile} $isTablet={isTablet}>
        <S.Title $isMobile={isMobile}>실시간 응원 현황</S.Title>
        <S.BackArrow
          src={UpArrowImg}
          alt="작성하기"
          onClick={() => navigate("/cheer/write")}
          $isMobile={isMobile}
        />
      </S.TitleBox>
      <S.CheerCardWrapper
        $isMobile={isMobile}
        $isTablet={isTablet}
        style={{ overflowX: "auto", whiteSpace: "nowrap" }} // 좌우 스크롤 가능하게 설정
      >
        {previewCheerData.map((cheer) => (
          <S.CheerCard
            key={cheer.id}
            bgColor={cheer.bgColor}
            $isMobile={isMobile}
            style={{ display: "inline-block" }} // 옆으로 나열
          >
            {/* 상단(수신자) */}
            <S.CheerHeader $isMobile={isMobile}>
              <S.CheerAvatar
                src={cheer.r_profile || FarmLogoImg}
                alt="profile"
                $isMobile={isMobile}
              />
              <S.CheerReceiverText $isMobile={isMobile}>
                <a>{cheer.receiver}</a> 님에게&nbsp;{" "}
                <a>
                  <S.CheerColorText
                    $categoryColor={cheer.fontColor}
                    $isMobile={isMobile}
                  >
                    {cheer.category}
                  </S.CheerColorText>
                </a>
              </S.CheerReceiverText>
            </S.CheerHeader>

            {/* 중단(본문) */}
            <S.CheerContent $isMobile={isMobile}>
              {cheer.content}
            </S.CheerContent>

            {/* 하단(발신자) */}
            <S.CheerFooter $isMobile={isMobile}>
              <S.CheerAvatar
                src={cheer.s_profile || FarmLogoImg}
                alt="profile"
                $isMobile={isMobile}
              />
              <a>{cheer.sender}</a>&nbsp;님
            </S.CheerFooter>
          </S.CheerCard>
        ))}
      </S.CheerCardWrapper>
    </S.CheerContainer>
  );
}
