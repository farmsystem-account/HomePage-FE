import styled, { keyframes, css } from "styled-components";

interface ResponsiveProps {
  $isApp?: boolean;
  $isMobile?: boolean;
  $isDesktop?: boolean;
}

export const FarmingLogCard = styled.div<ResponsiveProps>`
  width: 100%;
  max-width: 800px;
  padding: 15px 12px 0px 13px;
  // padding: ${({ $isApp }) => ($isApp ? '20px 15px 0px 15px' : '')};
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  background: var(--FarmSystem_White, #FCFCFC);
  border-radius: 5px; 
  border: 2px solid var(--FarmSystem_LightGrey, #E5E5E5);
`;

// 일단 사진 없이
export const Thumbnail = styled.img`
  width: 250px;
  aspect-ratio: 250/167;
`;

export const ContentContainer = styled.div<ResponsiveProps>`
  display: flex;
  padding: 10px 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $isApp }) => ($isApp ? '5px' : '15px')};
  align-self: stretch;
`;

export const CategoryContainer = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const Category = styled.div<ResponsiveProps>`
  display: flex;
  padding: ${({ $isApp }) => ($isApp ? '0px 10px' : '5px 15px')};
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: ${({ $isApp }) => ($isApp ? '10px' : '20px')};
  background: #5CD282;

  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '12px' : '15px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const EditButton = styled.button`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding-right: 2px;
`;

export const TitleContainer = styled.div<ResponsiveProps>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 5px;
  align-self: stretch;
`;

export const Title = styled.h2<ResponsiveProps>`
  display: flex;
  height: 16px;
  flex-direction: column;
  justify-content: center;

  color: #2E2E2E;
  font-family: "Pretendard Variable";
  // 제목 Figma 상에선 32px이지만, 너무 큰 것 같아서 임의로 24px로 줄여봤습니다.
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '16px' : $isMobile ? '20px' : '24px')};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 125% */
  letter-spacing: -0.24px;
`;

const pop = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.6);
  }
  100% {
    transform: scale(1);
  }
`;

export const LikeContainer = styled.div<ResponsiveProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`;

export const LikeImage = styled.img<{ clicked: boolean } & ResponsiveProps>`
  width: ${({ $isApp, $isMobile }) => ($isApp ? '20px' : $isMobile ? '25px' : '30px')};
  height: ${({ $isApp, $isMobile }) => ($isApp ? '20px' : $isMobile ? '25px' : '30px')};
  flex-shrink: 0;
  aspect-ratio: 1/1;

  cursor: pointer;
  transition: transform 0.2s ease;

  ${({ clicked }) => clicked && css`
    animation: ${pop} 0.3s ease;
  `}
`;

export const LikeCount = styled.span<ResponsiveProps>`
  display: flex;
  width: 20px;
  height: 10px;
  flex-direction: column;
  justify-content: center;

  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '8px' : $isMobile ? '12px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 250% */
  letter-spacing: -0.24px;
`;

export const InfoContainer = styled.div<ResponsiveProps>`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const CreatedAt = styled.span<ResponsiveProps>`
  display: flex;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;

  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '13px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const Author = styled.span<ResponsiveProps>`
  display: flex;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;

  color: #2E2E2E;
  text-align: right;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '10px' : $isMobile ? '13px' : '16px')};
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const Content = styled.p<ResponsiveProps>`
  width: 100%;
  max-width: 790px;
  min-height: 60px;
  white-space: normal;
  overflow-wrap: break-word;  /* 긴 단어를 적절히 나눔 */
  word-break: break-all;      /* 필요시 강제로 줄바꿈 */
  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-size: ${({ $isApp, $isMobile }) => ($isApp ? '12px' : $isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  letter-spacing: -0.24px;
`;

export const DetailContainer = styled.div<ResponsiveProps>`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-end;
  align-self: stretch;
  height: 20px;
`;

export const DetailButton = styled.button`
  display: flex;
  width: 60px;
  padding: 0px 5px;
  justify-content: center;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const DetailButtonText = styled.span`
  color: var(--FarmSystem_DarkGrey, #999);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const DetailButtonImage = styled.img<{ viewDetail: boolean }>`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
  ${({ viewDetail }) => viewDetail && css`
    transform: rotate(180deg);
  `}
  cursor: pointer;
`;