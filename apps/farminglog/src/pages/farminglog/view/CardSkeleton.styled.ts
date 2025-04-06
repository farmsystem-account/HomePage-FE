import styled, { css } from "styled-components";

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isDesktop?: boolean;
}

/* 
  skeletonStyle: 텍스트나 이미지를 숨기고 회색 박스 형태로 표시하기 위한 기본 스타일
*/
const skeletonStyle = css`
  background: #e0e0e0;
  color: transparent;
  border-radius: 4px;
`;

/* 태그 (Category) */
export const SkeletonCategory = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  width: 80px;
  height: 28px;
`;

/* 수정 버튼 (EditButton) */
export const SkeletonEditButton = styled.div`
  ${skeletonStyle};
  width: 24px;
  height: 24px;
`;

/* 제목 (Title) */
export const SkeletonTitle = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  width: 60%;
  height: 24px;
`;

/* 좋아요 이미지 (LikeImage) */
export const SkeletonLikeImage = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  width: ${({ $isApp, $isMobile }) =>
    $isApp ? "20px" : $isMobile ? "25px" : "30px"};
  height: ${({ $isApp, $isMobile }) =>
    $isApp ? "20px" : $isMobile ? "25px" : "30px"};
  border-radius: 50%;
`;

/* 좋아요 카운트 (LikeCount) */
export const SkeletonLikeCount = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  width: 20px;
  height: 10px;
`;

/* 작성일 (CreatedAt) */
export const SkeletonCreatedAt = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  flex: 1;
  height: 16px;
`;

/* 작성자 (Author) */
export const SkeletonAuthor = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  flex: 1;
  height: 16px;
`;

/* 내용 (Content) */
export const SkeletonContent = styled.div<ResponsiveProps>`
  ${skeletonStyle};
  width: 100%;
  min-height: 60px;
`;

/* 더보기 버튼 (DetailButton) */
export const SkeletonDetailButton = styled.div`
  ${skeletonStyle};
  width: 60px;
  height: 20px;
`;
