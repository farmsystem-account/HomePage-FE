import styled from "styled-components";

interface NotificationCardProps {
  data: {
    id: number;
    category: string;
    date: string;
    message: string;
    nickname: string;
    highlight?: string;
    description?: string;
    fromUser?: string;
    profileImage?: string;
    color?: string;
  };
}

export default function NotificationCard({ data }: NotificationCardProps) {
  const {
    category,
    date,
    message,
    nickname,
    highlight,
    description,
    fromUser,
    profileImage,
    color = "#FFF9A5", // default 배경색
  } = data;

  return (
    <CardWrapper>
      <CardHeader>
        <Category>{category}</Category>
        <Date>{date}</Date>
      </CardHeader>

      <CardMessage>{message}</CardMessage>

      {highlight && (
        <HighlightBox style={{ backgroundColor: color }}>
          <HighlightTop>
            <ProfileImage src={profileImage || "https://placehold.co/30x30"} />
            <HighlightText>
              <strong>{nickname}</strong>님에게{" "}
              <HighlightWord>{highlight}</HighlightWord>
            </HighlightText>
          </HighlightTop>

          <Description>{description}</Description>

          <FromText>
            <ProfileImageSmall src={profileImage || "https://placehold.co/20x20"} />
            <strong>{fromUser}</strong> 님
          </FromText>
        </HighlightBox>
      )}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  background: #f6fbf9;
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: "Pretendard Variable";
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Category = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #757575;
`;

const Date = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #757575;
`;

const CardMessage = styled.div`
  font-size: 18px;
  font-weight: 500;
  line-height: 1.4;
  color: #000;
`;

const HighlightBox = styled.div`
  border-radius: 10px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const HighlightTop = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HighlightText = styled.div`
  font-size: 16px;
  color: #2e2e2e;
  display: flex;
  gap: 4px;
`;

const HighlightWord = styled.span`
  color: #a49900;
  font-weight: 700;
`;

const Description = styled.div`
  font-size: 16px;
  color: #2e2e2e;
  line-height: 1.6;
  text-align: left;
`;

const FromText = styled.div`
  font-size: 16px;
  color: #2e2e2e;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ProfileImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const ProfileImageSmall = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;
