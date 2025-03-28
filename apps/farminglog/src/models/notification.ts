export interface Notification {
  notificationId: number;
  type: 'CHEER' | 'SEED' | 'ETC'; // 응원, 씨앗, 기타
  title: string;
  message: string;
  targetUrl: string;
  isRead: boolean;
  createdAt: string;
}
