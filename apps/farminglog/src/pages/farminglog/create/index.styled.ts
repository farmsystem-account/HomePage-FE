import styled from "styled-components";

export const FarmingLogEditorContainer = styled.div`
  width: 290px;
  height: screen;
  padding: 15px 12px 0px 13px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  border-radius: 5px;
  background: var(--FarmSystem_White, #FCFCFC);
`;

export const FarmingLogEditorContainerHeader = styled.div`
  width: 220px;
  height: 60px;
  flex-shrink: 0;

  border-radius: 5px;
  border: 1px solid #FFF763;
  background: #FFFAA4;
  box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.25);

  display: flex;
  flex-direction: column;
`;

export const HeaderPinContainer = styled.div`
  width: 100%;
  height: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: top;
  z-index: 1;
`;

export const HeaderPin = styled.div`
  display: flex;
  width: 11px;
  height: 11px;
  padding: 2px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  margin: 3px 6px 0px 6px;

  border-radius: 6px;
  background: #FF9A4D;
  box-shadow: 0px 2px 2px 0px #FF6F00 inset;
`;

export const HeaderPinIcon = styled.img`
  width: 7px;
  height: 7px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
`;

export const HeaderContext = styled.h3`
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 16px; /* 160% */
  letter-spacing: -0.24px;
`;

export const HeaderContextBold = styled.span`
  font-weight: 700;
`;

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
  height: 20px;
  padding: 5px 10px;
  align-items: center;
  gap: 5px;

  border-radius: 10px;
  background: #5CD282;
`;

export const CategoryText = styled.p`
  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;