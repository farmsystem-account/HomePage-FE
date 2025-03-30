// Popup.tsx
import React from "react";
import { PopupProps, PopupVariant } from "./popup.types";
import * as S from "./popup.styled";
import useMediaQueries from "@/hooks/useMediaQueries";

const Popup: React.FC<PopupProps> = (props) => {
  const { isMobile, isTablet } = useMediaQueries();
  const { isOpen, onClose, variant } = props;

  if (!isOpen) return null;

  // 팝업 클릭 시 배경을 누르면 닫힘ㅁㅁ
  const handleOverlayClick = () => {
    onClose();
  };

  // 알림 전파? 이건 한번 확인
  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  // 각 variant별로 렌더링할 컴포넌트 분기
  const renderContent = () => {
    switch (variant) {
      case "PROFILE":
        return <ProfileLayout {...props} />;
      case "MYPAGE":
        return <MyPageLayout {...props} />;
      case "MESSAGE":
        return <MessageLayout {...props} />;
      default:
        return null;
    }
  };

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.PopupBox onClick={stopPropagation} $isMobile={isMobile} $isTablet={isTablet}>
        {renderContent()}
      </S.PopupBox>
    </S.PopupOverlay>
  );
};

export default Popup;

/** 1) PROFILE UI 예시 */
const ProfileLayout: React.FC<PopupProps> = ({
  onClose,
  userName,
  generationAndPart,
  major,
  githubId,
  profileImg,
}) => {
  const { isMobile, isTablet } = useMediaQueries();

  return (
    <>
      {/* 닫기 아이콘 */}
      <S.CloseIconButton onClick={onClose}>
        {/* <CloseIcon width={24} height={24} /> */}
        ✕ {/* 예시 (텍스트) */}
      </S.CloseIconButton>

      {/* 프로필 이미지 (새싹 아이콘 등) */}
      <S.ProfileCircle>
        {profileImg ? (
          <img src={profileImg} alt="profile" />
        ) : (
          <span>🌱</span> // 대체
        )}
      </S.ProfileCircle>

      {/* 이름 + 기수/파트 + 전공 */}
      <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
        {userName || "이름"}
      </S.PopupTitle>
      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {generationAndPart || "3기 보안/웹"} | {major || "경영정보학과"}
      </S.PopupText>

      <S.Divider />

      {/* 깃허브 아이디 영역 (아래쪽) */}
      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {githubId ? (
          <>
            <img
              src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
              width={24}
              height={24}
              style={{ marginRight: 8 }}
              alt="github"
            />
            {githubId}
          </>
        ) : (
          "깃허브 아이디 없음"
        )}
      </S.PopupText>
    </>
  );
};

/** 2) MYPAGE UI 예시 */
const MyPageLayout: React.FC<PopupProps> = ({
  onClose,
  userName,
  generationAndPart,
  hasAlarm,
  hasLogout,
}) => {
  const { isMobile, isTablet } = useMediaQueries();

  return (
    <>
      {/* 우측 상단에 아이콘들 */}
      <S.IconContainer>
        {/* 벨 아이콘 + 빨간점 */}
        {hasAlarm && (
          <div className="alarm">
            {/* <BellIcon width={24} height={24} /> */}
            🔔
          </div>
        )}
        {/* 로그아웃 아이콘 */}
        {hasLogout && (
          <button onClick={onClose}>
            {/* <LogoutIcon width={24} height={24} /> */}
            ➜
          </button>
        )}
      </S.IconContainer>

      {/* 프로필 이미지(간단히) */}
      <S.ProfileCircle>
        <span>🌱</span>
      </S.ProfileCircle>

      <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
        {userName || "박팜"}
      </S.PopupTitle>
      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {generationAndPart || "4기 보안/웹"}
      </S.PopupText>

      <S.Divider />

      {/* 아래쪽에 '마이페이지' 같은 텍스트만 표시 */}
      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        마이페이지
      </S.PopupText>
    </>
  );
};

/** 3) MESSAGE UI 예시 */
const MessageLayout: React.FC<PopupProps> = ({
  onClose,
  mainMessage,
  subMessage,
  confirmLabel,
}) => {
  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}>
        {mainMessage || "파밍로그 작성이 완료되었어요."}
      </p>
      <p style={{ fontSize: "20px", color: "#00a34a", fontWeight: 600 }}>
        {subMessage || "씨앗 5개 획득!"}
      </p>

      <S.Divider />

      <S.ConfirmButton onClick={onClose}>
        {confirmLabel || "확인"}
      </S.ConfirmButton>
    </>
  );
};
