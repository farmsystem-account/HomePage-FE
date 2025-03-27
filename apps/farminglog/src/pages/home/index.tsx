import Harvest from "./Harvest/harvest";
import Ranking from "./Ranking/ranking";
import Cheer from "./Cheer/cheer";
import * as S from "./index.styled";
import useMediaQueries from "../../../../website/src/hooks/useMediaQueries";

export default function Main() {
  const { isApp, isMobile } = useMediaQueries();
  return (
    <>
      <S.MainContainer $isApp={isApp} $isMobile={isMobile}>
        <Harvest />
        <Ranking />
        <Cheer />
      </S.MainContainer> 
    </>
  );
}
