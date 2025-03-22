import styled from 'styled-components';

export const FarmingLogContainer = styled.div`
  width: 320px;
  height: screen;
  padding: 20px 15px 0px 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FarmingLogContainerHeader = styled.div`
  width: 100%;
  height: 40px;
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
`;

export const FarmingLogContainerTitle = styled.h1`
  grid-column: 2;
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 26px; /* 130% */
  letter-spacing: -0.24px;
`;

export const GoBackButton = styled.button`
  grid-column: 1;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
`;

export const FarmingLogCardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;