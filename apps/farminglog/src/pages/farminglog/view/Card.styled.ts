import styled, { keyframes, css } from "styled-components";

export const FarmingLogCard = styled.div`
  display: flex;
  width: 260px;
  padding: 10px 5px;
  flex-direction: column;
  align-items: center;

  border-radius: 5px;
  border: 1px solid #DBDBDB;
`;

export const Thumbnail = styled.img`
  width: 250px;
  aspect-ratio: 250/167;
`;

export const ContentContainer = styled.div`
  display: flex;
  padding: 10px 5px;
  flex-direction: column;
  align-items: flex-start;
  gap: 5px;
  align-self: stretch;
`;

export const CategoryContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const Category = styled.div`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  align-items: center;
  gap: 10px;

  border-radius: 10px;
  background: #5CD282;

  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

export const Title = styled.h2`
  display: flex;
  width: 205px;
  height: 16px;
  flex-direction: column;
  justify-content: center;

  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-size: 16px;
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

export const LikeContainer = styled.div`
  display: flex;
  width: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;

  cursor: pointer;
`;

export const LikeImage = styled.img<{ clicked: boolean }>`
  width: 20px;
  height: 20px;
  aspect-ratio: 1/1;
  cursor: pointer;
  transition: transform 0.2s ease;

  ${({ clicked }) => clicked && css`
    animation: ${pop} 0.3s ease;
  `}
`;

export const LikeCount = styled.span`
  display: flex;
  width: 20px;
  height: 10px;
  flex-direction: column;
  justify-content: center;

  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 8px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 250% */
  letter-spacing: -0.24px;
`;

export const InfoContainer = styled.div`
  display: flex;
  padding: 5px 0px;
  align-items: center;
  gap: 10px;
  align-self: stretch;
`;

export const CreatedAt = styled.span`
  display: flex;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;

  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const Author = styled.span`
  display: flex;
  height: 16px;
  flex-direction: column;
  justify-content: center;
  flex: 1 0 0;

  color: #2E2E2E;
  text-align: right;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const Content = styled.p`
  align-self: stretch;
  color: #2E2E2E;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const DetailContainer = styled.div`
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

export const DetailButtonImage = styled.img`
  width: 15px;
  height: 15px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;