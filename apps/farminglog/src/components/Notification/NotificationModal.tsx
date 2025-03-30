import styled from "styled-components";
import NotificationCard from "./NotificationCard";
import { useNotificationListQuery } from "@/services/query/useNotificationListQuery";

interface NotificationModalProps {
  onClose: () => void;
}

export interface LocalNotification {
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
}

export default function NotificationModal({ onClose }: NotificationModalProps) {
  const { data: notifications = [] } = useNotificationListQuery();

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <Header>
          <BackIcon onClick={onClose}>←</BackIcon>
          <Title>알림</Title>
        </Header>

        <Content>
          {notifications.map((item) => {
            const localItem: LocalNotification = {
              id: item.notificationId,
              category: item.type,
              date: item.createdAt,
              message: item.message,
              nickname: "관리자", // 서버 응답에 없다면 임시로
              highlight: item.type === "CHEER" ? "칭찬해요!" : "",
              description: item.title,
              fromUser: "박팜", // 서버 응답에 없다면 고정 or 무시
              profileImage: "", // 프로필 이미지가 있다면 URL로 교체
              color:
                item.type === "CHEER"
                  ? "#FFF9A5"
                  : item.type === "SEED"
                  ? "#8FB7F2"
                  : "#F6FBF9",
            };

            return <NotificationCard key={item.notificationId} data={localItem} />;
          })}
        </Content>
      </Modal>
    </Overlay>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  width: 440px;
  height: 90vh;
  background: white;
  border-radius: 16px;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  font-family: "Pretendard Variable";
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-weight: 700;
  font-size: 20px;
  margin-bottom: 16px;
`;

const BackIcon = styled.div`
  font-size: 24px;
  cursor: pointer;
`;

const Title = styled.div`
  flex: 1;
  text-align: left;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  overflow-y: auto;
  height: 100%;
  padding-bottom: 32px;
`;
