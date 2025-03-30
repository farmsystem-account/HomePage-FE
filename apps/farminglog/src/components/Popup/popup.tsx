import React from "react";
import { PopupProps } from "./popup.types";
import * as S from "./popup.styled";
import useMediaQueries from "@/hooks/useMediaQueries";

import BellIcon from "@/assets/Icons/bell.png";
import LogoutIcon from "@/assets/Icons/log-out.png";
import GithubIcon from "@/assets/Icons/github.png";
import CloseIcon from "@/assets/Icons/close.png";

const Popup: React.FC<PopupProps> = (props) => {
  const { isMobile, isTablet } = useMediaQueries();
  const { isOpen, onClose, variant } = props;

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

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

/** 1) PROFILE 팝업 */
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
      <S.CloseIconButton onClick={onClose}>
        <img src={CloseIcon} alt="닫기" width={24} height={24} />
      </S.CloseIconButton>

      <S.ProfileLayoutRow $isMobile={isMobile}>
        <S.ProfileCircle $isMobile={isMobile}>
          {profileImg ? <img src={profileImg} alt="profile" /> : <span>🌱</span>}
        </S.ProfileCircle>

        <S.InfoBox $isMobile={isMobile}>
          <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>{userName || "이름"}</S.PopupTitle>
          <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>{generationAndPart || "3기 보안/웹"}</S.PopupText>
        </S.InfoBox>
      </S.ProfileLayoutRow>

      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {major || "전공 없음"}
      </S.PopupText>

      <S.Divider $isMobile={isMobile} />

      <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
        {githubId ? (
          <>
            <img src={GithubIcon} width={24} height={24} alt="github" style={{ marginRight: 8 }} />
            {githubId}
          </>
        ) : (
          "깃허브 아이디 없음"
        )}
      </S.PopupText>
    </>
  );
};

/** 2) MYPAGE 팝업 */
const MyPageLayout: React.FC<PopupProps> = ({
  onClose,
  userName,
  generationAndPart,
  profileImg,
  hasAlarm,
  hasLogout,
}) => {
  const { isMobile, isTablet } = useMediaQueries();

  return (
    <>
      <S.IconContainer $isMobile={isMobile}>
        {hasAlarm && (
        <div className="alarm">
        <img
          src={BellIcon}
          alt="알림"
          width={isMobile ? 20 : 40}
          height={isMobile ? 20 : 40}
        />
        <S.AlarmDot />
        </div>
        )}
        {hasLogout && (
        <button onClick={onClose}>
        <img
          src={LogoutIcon}
          alt="로그아웃"
          width={isMobile ? 20 : 40}
          height={isMobile ? 20 : 40}
        />
        </button>
        )}
      </S.IconContainer>

      <S.ProfileLayoutRow $isMobile={isMobile}>
        <S.ProfileCircle $isMobile={isMobile}>
          {profileImg ? <img src={profileImg} alt="profile" /> : <span>🌱</span>}
        </S.ProfileCircle>

        <S.InfoBox $isMobile={isMobile}>
          <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>{userName || "사용자"}</S.PopupTitle>
          <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>{generationAndPart || "4기 보안/웹"}</S.PopupText>
        </S.InfoBox>
      </S.ProfileLayoutRow>

      <S.Divider $isMobile={isMobile} />

      <S.CenteredPopupText $isMobile={isMobile} onClick={() => window.location.href = "/mypage"}>
        마이페이지
      </S.CenteredPopupText>
    </>
  );
};

/** 3) MESSAGE 팝업 */
const MessageLayout: React.FC<PopupProps> = ({
  onClose,
  mainMessage,
  subMessage,
  confirmLabel,
}) => {
  const { isMobile } = useMediaQueries();

  return (
    <>
      <p style={{ fontSize: "18px", fontWeight: 500, marginBottom: "8px" }}>
        {mainMessage || "파밍로그 작성이 완료되었어요."}
      </p>
      <p style={{ fontSize: "20px", color: "#00a34a", fontWeight: 600 }}>
        {subMessage || "씨앗 5개 획득!"}
      </p>

      <S.Divider $isMobile={isMobile} />

      <S.ConfirmButton onClick={onClose}>{confirmLabel || "확인"}</S.ConfirmButton>
    </>
  );
};