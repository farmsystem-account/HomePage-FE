import Harvest from "./Harvest/harvest";
import Ranking from "./Ranking/ranking";
import Cheer from "./Cheer/cheer";
import * as S from "./index.styled";
import useMediaQueries from "../../../../website/src/hooks/useMediaQueries";
import { useUserInfoQuery } from "@repo/auth/services/query/useUserInfoQuery";
import LoadingSkeleton from "@/components/Skeleton/LoadingSkeleton";

export default function Main() {
  const { isApp, isMobile } = useMediaQueries();
  const { isLoading } = useUserInfoQuery(true);

  return isLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "80vh",
      }}
    >
      <LoadingSkeleton />
    </div>
  ) : (
    <S.MainContainer $isApp={isApp} $isMobile={isMobile}>
      <Harvest />
      <Ranking />
      <Cheer />
    </S.MainContainer>
  );
}
