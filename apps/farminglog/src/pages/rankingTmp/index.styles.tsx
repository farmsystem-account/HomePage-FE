import styled from 'styled-components';

export const MyPageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background: linear-gradient(90deg, #5CD282, #29D4A7);
  padding: 40px 20px;
`;

export const ProfileWrapper = styled.div<{ isMobile: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
  background: white;
  border-radius: 3px;
  padding: ${({ isMobile }) => (isMobile ? '0px 0px 30px 0px' : '0px 24px 30px 24px')};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  color: black;
`;

export const TitleBox = styled.div<{ isMobile: boolean }>`
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: white;
  padding: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
`;

export const Title = styled.h2`
  font-size: 24px;
  font-weight: bold;
`;

export const EditButton = styled.button`
  margin-left: auto;
  padding: 6px 12px;
  font-size: 14px;
  font-weight: 500;
  color: white;
  background-color: #29d4a7;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #25be96;
  }
`;

export const SectionTitleBox = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-bottom-width: 0.5px;
  border-bottom-style: solid;
  border-bottom-color: #bebebe;
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  margin-top: 24px;
  margin-bottom: 12px;
`;

export const Phrase = styled.img<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '300px' : '400px')};
  margin-top: 40px;
`;

export const Logo = styled.img`
  width: 40px;  
  height: 40px
`;

export const BackArrow = styled.img`
  width: 25px;  
`;

export const Icon = styled.img`
  width: 30px;  
  margin-right: 5px;
`;

export const Icon2 = styled.img`
  width: 23px;  
  margin-right: 5px;
  margin-bottom: 5px;
`;

export const RowBox = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const ColumnBox = styled.div`
  /* height: 35px; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0px;
`;


export const RankingTitle = styled.div<{ isApp: boolean }>`
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  width: 80%;
  display: flex;
  justify-content: ${({ isApp }) => (isApp ? 'space-around' : 'space-around')};
  align-items: center;
  /* background-color: pink; */
  /* padding-left: 10px; */
`;

export const RankingTitleText = styled.div<{ isApp: boolean }>`
  width: ${({ isApp }) => (isApp ? '75px' : '90px')};
  font-size: ${({ isApp }) => (isApp ? '9px' : '12px')};
  color: #2e2e2e;
  font-weight: 600;
  margin-bottom: 10px;
  /* background-color: green; */
  text-align: center;
  /* margin-left: 10px; */
`;

export const RankingList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 80%;
`;

export const RankingItem = styled.div<{
  bgColor: string;
  isMe?: boolean;
  isApp?: boolean;
}>`
  position: relative;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: ${({ isApp }) => (isApp ? 'space-around' : 'space-around')};
  align-items: center;
  background-color: ${({ bgColor }) => bgColor};
  border-radius: 12px;
  padding:  ${({ isApp }) => (isApp ? '20px' : '16px')};
  border: ${({ isMe }) => (isMe ? '3px solid #29D4A7' : 'none')};
`;


export const RankBox = styled.div`
  position: relative;
  width: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const RankNumber = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
`;

export const CrownIcon = styled.img`
  position: absolute;
  /* top: -18px; */
  left: 30px;
  width: 20px;
  height: 20px;
`;

export const ProfileSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ProfileIcon = styled.img`
  width: 32px;
  height: 32px;
  background-color: #F5F5F5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
`;

export const Name = styled.div<{ isApp: boolean }>`
  font-weight: 600;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
`;

export const Track = styled.div<{ isApp: boolean }>`
  font-size: ${({ isApp }) => (isApp ? '10px' : '11px')};
  color: #2E2E2E;
  font-weight: 600;
`;

export const Score = styled.div<{ isApp: boolean }>`
  font-weight: bold;
  font-size: ${({ isApp }) => (isApp ? '14px' : '16px')};
`;

export const Crown = styled.div`
  
`;

export const Balloon = styled.img`
  position: absolute;
  top: -64px;
  left: -2px;
  width: 150px;
  height: auto;
  z-index: 10;
`;
