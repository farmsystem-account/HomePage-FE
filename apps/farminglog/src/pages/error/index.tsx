import { useNavigate, useRouteError } from "react-router";
import useMediaQueries from "@/hooks/useMediaQueries";

import * as S from './index.styled';
// import FarmLogo_Black from '../../../assets/FarmLogo_Black.png';
// import RightArrow from '../../../assets/RightArrow.png';
import Logo from '@/assets/logos/logo.basic.png';
import Arrow from '@/assets/Icons/Arrow_right.png';

export default function Error() {  
    const { isMobile } = useMediaQueries();
  const navigate = useNavigate();
  const error = useRouteError() as { statusText?: string; message?: string };

  const handleNavigateToTracks = () => {
    navigate("/home");
  };

  return (
    <S.Container $isMobile={isMobile} id="applyStep1">

        <S.FarmLogo src={Logo} alt="FarmLogo" />

        <S.HelloText $isMobile={isMobile}>
        {error?.statusText || error?.message || "에러가 발생했어요"}
        </S.HelloText>

        {isMobile ? (
          <S.QuestionText $isMobile={isMobile}>
            해당 페이지에 문제가 발생했어요.
          </S.QuestionText>
        ): (
          <S.QuestionText $isMobile={isMobile}>
            해당 페이지에 문제가 발생했어요.
          </S.QuestionText>
        )}
        
        <S.BottomTextContainer $isMobile={isMobile}>
          <S.Arrow src={Arrow} alt="Arrow" />
          <S.BottomText $isMobile={isMobile} onClick={handleNavigateToTracks}>
            홈으로 돌아가기
          </S.BottomText>
        </S.BottomTextContainer>
    </S.Container>
  );
}
