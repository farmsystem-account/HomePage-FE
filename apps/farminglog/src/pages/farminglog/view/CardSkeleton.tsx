import * as S from "./CardSkeleton.styled";
import useMediaQueries from "@/hooks/useMediaQueries";

export default function CardSkeleton() {
  const { isApp, isMobile } = useMediaQueries();
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        padding: "15px 12px 0px 13px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "30px",
        backgroundColor: "#FCFCFC",
        border: "2px solid #e0e0e0",
        borderRadius: "5px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "stretch",
          padding: "10px 5px",
          gap: isApp ? "5px" : "15px",
        }}
      >
        {/* 상단: 태그와 수정 버튼 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <S.SkeletonCategory $isApp={isApp} $isMobile={isMobile} />
          <S.SkeletonEditButton />
        </div>
        {/* 제목과 좋아요 영역 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "5px",
          }}
        >
          <S.SkeletonTitle $isApp={isApp} $isMobile={isMobile} />
          <div style={{ display: "flex", flexDirection: "column", gap: "5px", alignItems: "center" }}>
            <S.SkeletonLikeImage $isApp={isApp} $isMobile={isMobile} />
            <S.SkeletonLikeCount $isApp={isApp} $isMobile={isMobile} />
          </div>
        </div>
        {/* 작성일과 작성자 영역 */}
        <div
          style={{
            display: "flex",
            width: "100%",
            gap: "10px",
            alignItems: "center",
          }}
        >
          <S.SkeletonCreatedAt $isApp={isApp} $isMobile={isMobile} />
          <S.SkeletonAuthor $isApp={isApp} $isMobile={isMobile} />
        </div>
        {/* 내용 */}
        <S.SkeletonContent $isApp={isApp} $isMobile={isMobile} />
      </div>
      {/* 하단: 더보기 버튼 */}
      <div
        style={{
          display: "flex",
          width: "100%",
          flexDirection: "column",
          alignItems: "flex-end",
          height: "20px",
        }}
      >
        <S.SkeletonDetailButton />
      </div>
    </div>
  );
}
