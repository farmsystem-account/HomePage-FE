import React from "react";
import * as S from "./profilePopup.styled";
import useMediaQueries from "@/hooks/useMediaQueries";

import GithubIcon from "@/assets/Icons/Github.png";
import CloseIcon from "@/assets/Icons/close.png";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
  userName: string;
  generationAndPart: string;
  major?: string;
  githubId?: string;
  profileImg?: string;
}

const ProfilePopup: React.FC<ProfilePopupProps> = ({
  isOpen,
  onClose,
  userName,
  generationAndPart,
  major = "전공 없음",
  githubId,
  profileImg,
}) => {
  const { isMobile, isTablet } = useMediaQueries();

  if (!isOpen) return null;

  const handleOverlayClick = () => {
    onClose();
  };

  const stopPropagation = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <S.PopupOverlay onClick={handleOverlayClick}>
      <S.PopupBox onClick={stopPropagation} $isMobile={isMobile} $isTablet={isTablet}>
        <S.CloseIconButton onClick={onClose}>
          <img src={CloseIcon} alt="닫기" width={24} height={24} />
        </S.CloseIconButton>

        <S.ProfileLayoutRow $isMobile={isMobile}>
          <S.ProfileCircle $isMobile={isMobile}>
            {profileImg ? <img src={profileImg} alt="profile" /> : <span>🌱</span>}
          </S.ProfileCircle>

          <S.InfoBox $isMobile={isMobile}>
            <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
              {userName}
            </S.PopupTitle>
            <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
              {generationAndPart}
            </S.PopupText>
          </S.InfoBox>
        </S.ProfileLayoutRow>

        <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
          {major}
        </S.PopupText>

        <S.Divider $isMobile={isMobile} />

        <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
          {githubId ? (
            <>
              <img
                src={GithubIcon}
                width={24}
                height={24}
                alt="github"
                style={{ marginRight: 8 }}
              />
              {githubId}
            </>
          ) : (
            "깃허브 아이디 없음"
          )}
        </S.PopupText>
      </S.PopupBox>
    </S.PopupOverlay>
  );
};

export default ProfilePopup;
