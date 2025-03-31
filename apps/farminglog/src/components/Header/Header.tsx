import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import * as S from "./Header.styled";
import LogoImage from "../../assets/home/farming_log.png";
import CloseIcon from "../../assets/react.svg";
import ProfileImage from "../../assets/home/default_profile.png";
import useMediaQueries from "@/hooks/useMediaQueries";
import Popup from "@/components/Popup/popup"; 
import { useUserStore } from "@repo/auth/stores/userStore";

const navItems = [
  { label: "홈", path: "/home" },
  { label: "응원하기", path: "/cheer" },
  { label: "파밍로그", path: "/farminglog/view" },
  { label: "랭킹", path: "/rankingDetail" },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet } = useMediaQueries();

  // user와 fetchUser 함수를 store에서 가져오기 (fetchUser는 최신 정보를 불러오는 함수)
  const user = useUserStore((s) => s.user);

  const name = user?.name;
  const profileImageUrl = user?.profileImageUrl;
  const totalSeed = user?.totalSeed;

  const handleNavItemClick = (path?: string) => {
    if (path) navigate(path);
    setMenuOpen(false);
  };

  const ProfileAndSeed = (
    <S.ProfileAndSeedContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.ProfileContainer $isMobile={isMobile}
        onClick={() => setProfilePopupOpen(true)}>
        <S.ProfileImage
          src={profileImageUrl || ProfileImage}
          alt={name || "사용자"}
          $isMobile={isMobile}
        />
        <S.ProfileName $isMobile={isMobile}>{name || ""}</S.ProfileName>
      </S.ProfileContainer>
      <S.RecordCount $isMobile={isMobile} $isTablet={isTablet}>
        <span className="seed-text">내 씨앗</span>
        <span className="seed-count">{totalSeed ?? 0}</span>
      </S.RecordCount>
    </S.ProfileAndSeedContainer>
  );

  return (
    <>
      <S.HeaderContainer $isMobile={isMobile}>
        <S.Logo onClick={() => navigate("/home")} $isMobile={isMobile} $isTablet={isTablet}>
          <img src={LogoImage} alt="파밍로그" />
        </S.Logo>

        {isMobile ? (
          <S.MobileHeader>{ProfileAndSeed}</S.MobileHeader>
        ) : (
          <>
            <S.NavWrapper>
              <S.Nav>
                {navItems.map(({ label, path }) => (
                  <S.NavItem
                    key={path}
                    $isTablet={isTablet}
                    $isMobile={isMobile}
                    onClick={() => navigate(path)}
                    isActive={location.pathname === path}
                  >
                    {label}
                  </S.NavItem>
                ))}
              </S.Nav>
            </S.NavWrapper>
            {ProfileAndSeed}
          </>
        )}

        <S.MobileNavWrapper $isMenuOpen={isMenuOpen}>
          {isMobile && (
            <>
              <S.CloseButton
                src={CloseIcon}
                alt="Close"
                onClick={() => setMenuOpen(false)}
              />
              <S.MobileNav>
                {navItems.map(({ label, path }) => (
                  <S.NavItem
                    key={path}
                    $isTablet={isTablet}
                    $isMobile={isMobile}
                    onClick={() => handleNavItemClick(path)}
                    isActive={location.pathname === path}
                  >
                    {label}
                  </S.NavItem>
                ))}
              </S.MobileNav>
            </>
          )}
        </S.MobileNavWrapper>
      </S.HeaderContainer>

      <Popup
        isOpen={isProfilePopupOpen}
        onClose={() => setProfilePopupOpen(false)}
        variant="MYPAGE"
        userName={user?.name}
        generationAndPart={`${user?.generation}기 ${user?.track}`}
        profileImg={user?.profileImageUrl} 
        // hasAlarm={false} // 알림 패치 후 바꿔야함       
        hasLogout={true}       
      />
    </>
  );
}
