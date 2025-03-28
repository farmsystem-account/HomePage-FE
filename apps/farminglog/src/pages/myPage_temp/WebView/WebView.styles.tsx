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

export const ProfileCard = styled.div<{ isMobile: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  width: ${({ isMobile }) => (isMobile ? '100%' : '900px')};
  background: #F6FBF9;
  padding: 20px 40px;
`;

export const ProfileImage = styled.div`
  width: 84px;
  height: 84px;
  background-color: #f0f0f0;
  border-radius: 50%;
  background-image: url('/plant-icon.png');
  background-size: cover;
`;

export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const RoleBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 6px;
  margin-bottom: 8px;
`;

export const Role = styled.span`
  font-size: 14px;
  color: black;
`;

export const Name = styled.span`
  font-size: 20px;
  font-weight: bold;
`;

export const InfoGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 16px 32px;
  margin-top: 12px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 220px;
  height: 50px;
`;

export const InfoLabel = styled.div`
  font-size: 16px;
  color: black;
  margin-bottom: 4px;
  font-weight: 700;
`;

export const InfoValue = styled.div`
  font-size: 16px;
  font-weight: 500;
`;


export const AccountLinks = styled.div<{ isMobile: boolean }>`
  display: flex;
  flex-direction: ${({ isMobile }) => (isMobile ? 'column' : 'row')};
  gap: 30px;
  margin-top: 20px;
`;

export const AccountBox = styled.div`
  width: 350px;
  height: 60px;
  background: #F6FBF9;
  border-radius: 8px;
  padding: 12px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
`;

export const AccountLable = styled.div`
  font-size: 16px;
  font-weight: 600;
`;

export const AccountValue = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: '#747775';
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
  gap: 10px;
`;

export const EditForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  max-width: 600px;
  margin-top: 16px;
`;

export const EditField = styled.div`
  display: flex;
  flex-direction: column;

  label {
    font-size: 14px;
    margin-bottom: 4px;
    font-weight: 600;
  }

  input {
    padding: 10px;
    font-size: 16px;
    border: 1.5px solid #29d4a7;
    border-radius: 8px;
    background-color: #f9fffc;
    transition: border-color 0.2s;

    &:focus {
      outline: none;
      border-color: #25be96;
    }
  }
`;
