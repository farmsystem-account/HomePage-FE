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

export const Thumbnail = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  aspect-ratio: 250/167;

  border-radius: 5px;
  background: #E5E5E5;
`;

export const FilePlusIcon = styled.img`
  width: 35px;
  height: 35px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
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

export const CategorySelect = styled.div`
  display: flex;
  height: 20px;
  padding: 5px 10px;
  align-items: center;
  gap: 5px;

  border-radius: 10px;
  background: #5CD282;
  cursor: pointer;
`;

export const CategoryOptionContainer = styled.ul`
  position: absolute;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  width: 66px;
  z-index: 1;
  padding: 5px 0px;
  align-items: center;
  gap: 10px;

  cursor: pointer;
  border-radius: 5px;
  border: 1px solid var(--FarmSystem_LightGrey, #E5E5E5);
  background: var(--FarmSystem_White, #FCFCFC);
  box-shadow: 4px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const CategoryOption = styled.li`
  align-self: stretch;
  cursor: pointer;

  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 500;
  line-height: 30px; /* 300% */
  letter-spacing: -0.24px;
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

export const InputAndTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  align-self: stretch;
`;

export const TitleContainer = styled.div`
  display: flex;
  width: 240px;
  padding: 0px 5px;
  align-items: flex-end;
  gap: 170px;
`;

export const TitleText = styled.p`
  color: #2E2E2E;
  text-align: center;
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const letterCount = styled.p`
  display: flex;
  width: 39px;
  height: 20px;
  flex-direction: column;
  justify-content: flex-end;
  flex-shrink: 0;

  color: var(--FarmSystem_DarkGrey2, #757575);
  text-align: right;
  font-family: "Pretendard Variable";
  font-size: 8px;
  font-style: normal;
  font-weight: 500;
  line-height: 14px; /* 175% */
  letter-spacing: -0.24px;
`;

export const InputBox = styled.input`
  display: flex;
  padding: 5px 5px 5px 10px;
  align-items: center;
  width: 100%;
  outline: none;

  border-radius: 5px;
  border: 1px solid #5CD282;
  background: var(--FarmSystem_White, #FCFCFC);
  color: var(--FarmSystem_DarkGrey, #999);

  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;

export const DateContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 5px 0px;
  align-items: center;
  align-self: stretch;
`;

export const DateText = styled.p`
  display: flex;
  justify-content: center;

  color: var(--FarmSystem_DarkGrey2, #757575);
  font-family: "Pretendard Variable";
  font-size: 10px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 200% */
  letter-spacing: -0.24px;
`;

export const TextArea = styled.textarea`
  display: flex;
  width: 100%;
  height: 100px;
  padding: 5px 10px;
  align-items: center;

  outline: none;
  border-radius: 5px;
  border: 1px solid #5CD282;
  background: var(--FarmSystem_White, #FCFCFC);

  color: var(--FarmSystem_DarkGrey, #999);
  font-family: "Pretendard Variable";
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px; /* 166.667% */
  letter-spacing: -0.24px;
`;