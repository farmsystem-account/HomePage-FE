// Popup.types.ts
export type PopupVariant = "PROFILE" | "MYPAGE" | "MESSAGE"| "INFO" | "CHEER";

/** 공통 prop */
interface BasePopupProps {
  isOpen: boolean;        // 팝업 열림 여부
  onClose: () => void;    // 닫기 핸들러
  variant: PopupVariant;  // 어떤 UI로 표시될지 
}

/**
 * 1) PROFILE 형태에서 필요한 prop
 *    - 예) 이름, 기수/파트, 학과, 깃허브ID, 프로필 아이콘, 닫기 아이콘 등
 */
interface ProfileProps {
  userName?: string;
  generationAndPart?: string; // "4기 보안/웹" 등
  major?: string;             // "경영정보학과" 등
  githubId?: string;          // 깃허브 아이디
  profileImg?: string;        // 프로필 아이콘 (URL)
}

/**
 * 2) MYPAGE 형태에서 필요한 prop
 *    - 예) 알림 아이콘, 로그아웃 아이콘(→), 이름, 기수/파트 등
 */
interface MyPageProps {
  userName?: string;
  generationAndPart?: string;
  hasAlarm?: boolean;   // 알림 아이콘 표시 여부
  hasLogout?: boolean;  // 로그아웃(→) 아이콘 표시 여부
}

/**
 * 3) MESSAGE 형태에서 필요한 prop
 *    - 예) 메시지(문구), 서브메시지, 버튼 레이블 등
 */
interface MessageProps {
  mainMessage?: string;   // "파밍로그 작성이 완료되었어요."
  subMessage?: string;    // "씨앗 5개 획득!"
  confirmLabel?: string;  // "확인" 버튼 레이블
}

/**
 * 4) /cheer 모달 창에서 필요한 prop
 *    - 예) 메세지, 서브 메시지, 닫기 아이콘 등
 */
interface CheerProps {
    mainMessage?: string;
    subMessage?: string;
    confirmLabel?: string;
}

/** 최종 PopupProps: 세 유형에서 쓸 수 있는 모든 필드를 합침 */
export type PopupProps = BasePopupProps & ProfileProps & MyPageProps & MessageProps & CheerProps;
