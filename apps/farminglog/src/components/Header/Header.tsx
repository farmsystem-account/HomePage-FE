import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router";
import * as S from "./Header.styled";
import LogoImage from "../../assets/home/farming_log.png";
import ProfileImage from "../../assets/home/default_profile.png";
import mainIcon from "@/assets/logos/logo.basic.png"; // 메인 아이콘
import crownIcon from "@/assets/Icons/tabler_crown.png"; // 랭킹 아이콘
import pencilIcon from "@/assets/Icons/edit-3.png"; // 파밍 아이콘
import thumbsUpIcon from "@/assets/Icons/goodgood.png"; // 응원 아이콘
import gameIcon from "@/assets/Icons/Seed.png"; // 게임 아이콘 (씨앗 아이콘 사용)

import useMediaQueries from "@/hooks/useMediaQueries";
import Popup from "@/components/Popup/popup";
import { useUserInfoQuery } from "@repo/auth/services/query/useUserInfoQuery";
import { convertTrackToString } from "@/utils/convertTrackToString";
import Cookies from "js-cookie";

const navItems = [
  { label: "홈", path: "/home" },
  { label: "응원", path: "/cheer" },
  { label: "파밍로그", path: "/farminglog/view" },
  { label: "게임", path: "/game" },
  { label: "랭킹", path: "/rankingDetail" },
];

export default function Header() {
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet } = useMediaQueries();

  const { data: user } = useUserInfoQuery();
  const isLimited = Cookies.get("limitWrite") === "true";

  const name = isLimited ? "" : user?.name;
  const profileImageUrl = isLimited ? undefined : user?.profileImageUrl;
  const totalSeed = isLimited ? 0 : user?.totalSeed;

  const handleNavigation = (path: string) => {
    navigate(path);
    setMenuOpen(false); // 이동 후 메뉴 닫기
  };

  // ✅ 메뉴 외 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const ProfileAndSeed = (
    <S.ProfileAndSeedContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.ProfileContainer
        $isMobile={isMobile}
        onClick={(e) => {
          if (isLimited) return; // 제한 모드에서는 팝업 비활성화
          e.stopPropagation();
          setProfilePopupOpen(true);
        }}
      >
        <S.ProfileImage
          src={profileImageUrl || ProfileImage}
          alt={name || "사용자"}
          $isMobile={isMobile}
        />
        <S.ProfileName $isMobile={isMobile}>{name || ""}</S.ProfileName>
      </S.ProfileContainer>
      {!isLimited && (
        <S.RecordCount $isMobile={isMobile} $isTablet={isTablet}>
          <span className="seed-text">내 씨앗</span>
          <span className="seed-count">{totalSeed ?? 0}</span>
        </S.RecordCount>
      )}
    </S.ProfileAndSeedContainer>
  );

  return (
    <>
      <S.HeaderContainer $isMobile={isMobile}>
        <S.Logo
          onClick={() => navigate("/home")}
          $isMobile={isMobile}
          $isTablet={isTablet}
        >
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
                    onClick={() => handleNavigation(path)}
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

        {/* ✅ 모바일 네비게이션 버튼 */}
        {isMobile && (
          <S.MobileWrapper ref={menuRef}>
            {isMenuOpen && (
              <>
                <S.MobileNavButton
                  style={{
                    bottom: "70px",
                    right: "7px",
                    backgroundImage: `url(${crownIcon})`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "scale(1)" : "scale(0.5)",
                  } as React.CSSProperties}
                  onClick={() => handleNavigation("/rankingDetail")}
                />
                <S.MobileNavButton
                  style={{
                    top: "7px",
                    left: "65px",
                    backgroundImage: `url(${thumbsUpIcon})`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "scale(1)" : "scale(0.5)",
                  } as React.CSSProperties}
                  onClick={() => handleNavigation("/cheer")}
                />
                <S.MobileNavButton
                  style={{
                    bottom: "50px",
                    left: "50px",
                    backgroundImage: `url(${pencilIcon})`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "scale(1)" : "scale(0.5)",
                  } as React.CSSProperties}
                  onClick={() => handleNavigation("/farminglog/view")}
                />
                <S.MobileNavButton
                  style={{
                    top: "50px",
                    right: "50px",
                    backgroundImage: `url(${gameIcon})`,
                    opacity: isMenuOpen ? 1 : 0,
                    transform: isMenuOpen ? "scale(1)" : "scale(0.5)",
                  } as React.CSSProperties}
                  onClick={() => handleNavigation("/game")}
                />
              </>
            )}
            <S.MobileMainButton onClick={() => setMenuOpen((prev) => !prev)}>
              <S.MobileMainButtonIcon src={mainIcon} alt="Menu" />
            </S.MobileMainButton>
          </S.MobileWrapper>
        )}
      </S.HeaderContainer>

      {/* 프로필 팝업 */}
      {!isLimited && (
        <Popup
          isOpen={isProfilePopupOpen}
          onClose={() => setProfilePopupOpen(false)}
          variant="MYPAGE"
          userName={user?.name}
          generationAndPart={
            user?.generation && user?.track
              ? `${user.generation}기 ${convertTrackToString(user.track)}`
              : "기수 정보 없음"
          }
          profileImg={user?.profileImageUrl}
          hasLogout={true}
        />
      )}
    </>
  );
}
