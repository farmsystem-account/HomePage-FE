// components/SearchItem.tsx

import styled from 'styled-components';

interface SearchItemProps {
  name: string;
  generation: string;
  profileUrl?: string;
  onClick: () => void;
}

export default function SearchItem({
  name,
  generation,
  profileUrl,
  onClick,
}: SearchItemProps) {
  return (
    <Wrapper onClick={onClick}>
      <ItemInner>
        <ProfileImage>
          <img src={profileUrl || 'https://placehold.co/31x31'} alt="profile" />
        </ProfileImage>
        <TextBox>
          <Name>{name}</Name>
          <Generation>{generation}</Generation>
        </TextBox>
      </ItemInner>
    </Wrapper>
  );
}

// 💅 styled-components
const Wrapper = styled.div`
  width: 100%;
  height: 103px;
  padding: 0 41px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #fcfcfc;
  border-bottom: 1px solid #dbdbdb;
  cursor: pointer;

  &:hover {
    background-color: #f6f6f6;
  }
`;

const ItemInner = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.div`
  width: 71.82px;
  height: 71.82px;
  border-radius: 50%;
  border: 2px solid #dbdbdb;
  background: #fcfcfc;
  position: relative;
  overflow: hidden;

  img {
    width: 30.78px;
    height: 30.78px;
    position: absolute;
    top: 21.55px;
    left: 21.55px;
  }
`;

const TextBox = styled.div`
  position: relative;
  width: 184.68px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: 700;
  line-height: 41.04px;
  color: #2e2e2e;
`;

const Generation = styled.div`
  font-size: 20px;
  font-weight: 400;
  line-height: 28.73px;
  color: #2e2e2e;
  margin-top: -4px;
`;
