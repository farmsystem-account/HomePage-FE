import styled from 'styled-components';

export const AppStyleWrapper = styled.div`
  width: 100%;
  height: 150%;
  background-color: #F7F6FB;
`;

export const TopInfoArea = styled.div`
  width: 100%;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(90deg, #5CD282, #29D4A7);
  color: white;
`;


export const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  /* background-color: green; */
`;

export const AppName = styled.text`

  font-size: 35px;
  font-weight: bold;
`;

export const AppEditIcon = styled.img`
  width: 20px;
`;

export const AppProfileImage = styled.div`
  width: 84px;
  height: 84px;
  background-image: url('/plant-icon.png');
  background-size: cover;
  border-radius: 50%;
  margin: 16px 0;
`;

export const AppRole = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(255, 255, 255, 0.3);
  color: white;
  padding: 4px 12px;
  font-size: 14px;
  border-radius: 20px;
`;

export const AppInfoTable = styled.div`
  width: 100%;
  margin-top: 24px;
`;

export const AppInfoRow = styled.div`
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);

  span {
    font-size: 14px;
    opacity: 0.9;
  }

  strong {
    font-weight: bold;
  }
`;

export const AppAccountBox = styled.div`
  width: 100%;
  margin-bottom: 32px;
  background: white;
  border-radius: 12px;
  padding: 16px;
  color: #333;
`;

export const AccountRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
`;

export const AccountText = styled.text`
  font-size: 15px;
  font-weight: 600;
  color: '#747775';
`
export const AppBottomArea = styled.div`
  width: 100%;
  height: 100%;
  background-color: #F7F6FB;
  padding: 24px 26px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 100px;
`;

export const RowBox = styled.div`
  height: 35px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  /* background-color: green; */
`;

export const ColumnBox = styled.div`
  /* height: 35px; */
  width: 130px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  /* gap: 10px; */
  /* background-color: green; */
`;

export const Icon = styled.img`
  width: 30px;  
  margin-right: 5px;
`;

export const ProfileImage = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  object-fit: cover;
`;

export const EditButton = styled.button`
  
  /* margin-top: 16px; */
  padding: 6px 16px;
  font-size: 14px;
  font-weight: 500;
  color: #fff;
  background-color: #29d4a7;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #25be96;
  }
`;






export const EditViewWrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #F7F6FB;
  padding: 24px;
`;

export const EditHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const EditTitle = styled.h2`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  font-size: 22px;
  font-weight: bold;
`;

export const CompleteButton = styled.button`
  background-color: #29d4a7;
  color: white;
  padding: 6px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
`;

export const EditProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 52px 0 24px;
`;

export const NameText = styled.div`
  font-size: 30px;
  font-weight: bold;
  margin-top: 12px;
  margin-bottom: 20px;
`;

export const EditSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  gap: 6px;
  margin-bottom: 5px;
  /* background-color: pink; */
`;

export const EditLabel = styled.label`
  font-size: 20px;
  color: #636363;
  font-weight: 600;
`;

export const Input = styled.input<{ colorType?: 'light' | 'dark' }>`
  border: none;
  /* border-bottom: 1px solid #ccc; */
  font-size: 18px;
  font-weight: 600;
  /* background-color: pink; */
  text-align: right;
  padding: 4px 0;
  color: ${({ colorType }) => (colorType === 'light' ? 'white' : '#333')};

  &:focus {
    outline: none;
    /* border-bottom: 1px solid #29d4a7; */
  }
`;

export const Line = styled.div`
    width: 100%;
    height: 0.5px;
    background-color: black;
    margin-bottom: 28px;
`

export const ProfileImageEdit = styled.img`
  width: 114px;
  height: 114px;
  border-radius: 50%;
  object-fit: cover;
`;