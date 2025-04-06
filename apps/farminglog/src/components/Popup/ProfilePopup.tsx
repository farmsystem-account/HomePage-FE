import * as S from "./profilePopup.styled"; // styled-components 모음
import useMediaQueries from "@/hooks/useMediaQueries";


import CloseIcon from "../../assets/Icons/close.png";
import GithubIcon from "../../assets/Icons/github.svg";

interface PopupProps {
  userName: string;
  generationAndPart: string;
  major: string;
  githubId?: string;
  profileImg?: string;
  onClose: () => void;
  stopPropagation: (e: React.MouseEvent) => void;
}

const Popup: React.FC<PopupProps> = ({
  userName,
  generationAndPart,
  major,
  githubId,
  profileImg,
  onClose,
  stopPropagation,
}) => {
  const { isMobile, isTablet } = useMediaQueries();
  return (
    <S.PopupOverlay>
      <S.PopupBox onClick={stopPropagation} $isMobile={isMobile} $isTablet={isTablet}>
        {/* 닫기 버튼 */}
        <S.CloseIconButton onClick={onClose} $isMobile={isMobile}>
          <img src={CloseIcon} alt="닫기" />
        </S.CloseIconButton>

        {/* 프로필 영역 */}
        <S.ProfileLayoutRow $isMobile={isMobile}>
          <S.ProfileCircle $isMobile={isMobile}>
            {profileImg ? (
              <img src={profileImg} alt="profile" />
            ) : (
              <span>🌱</span>
            )}
          </S.ProfileCircle>

          <S.InfoBox $isMobile={isMobile}>
            <S.PopupTitle $isMobile={isMobile} $isTablet={isTablet}>
              {userName}
            </S.PopupTitle>
            <S.PopupText $isMobile={isMobile} $isTablet={isTablet}>
              {generationAndPart} <a>|</a> {major}
            </S.PopupText>
          </S.InfoBox>
        </S.ProfileLayoutRow>

        <S.Divider $isMobile={isMobile} />

        {/* 깃허브 아이디 */}
        {!githubId ? (
          <S.PopupBottomText $isMobile={isMobile} $isTablet={isTablet}>
            <img
              src={GithubIcon}
              width={24}
              height={24}
              alt="github"
              style={{ marginRight: 8 }}
            />
            {"깃허브 아이디 없음"}
          </S.PopupBottomText>
        ) : (
          <S.PopupBottomText $isMobile={isMobile} $isTablet={isTablet}>
            <img
              src={GithubIcon}
              width={24}
              height={24}
              alt="github"
              style={{ marginRight: 8 }}
            />
            {githubId}
          </S.PopupBottomText>
        )}
      </S.PopupBox>
    </S.PopupOverlay>
  );
};

export default Popup;
