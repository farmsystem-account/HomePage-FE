import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import * as S from "./Header.styled";
import LogoImage from "../../assets/home/farming_log.png";
import CloseIcon from "../../assets/react.svg";
import ProfileImage from "../../assets/home/default_profile.png";
import useMediaQueries from "@/hooks/useMediaQueries";

import { useUserStore } from "@repo/auth/stores/userStore"; // 사용자 상태 가져오기

// 더미 데이터 (주석 처리했습니다!)
// const SeedCount = 678;
// const user = {
//   name: "팜하니",
//   profileImage: ProfileImage,
// };

const navItems = [
  { label: "홈", path: "/home" },
  { label: "응원하기", path: "/cheer" },
  { label: "파밍로그", path: "/farminglog/view" },
  { label: "랭킹", path: "/ranking" },
];

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet } = useMediaQueries();

  const user = useUserStore((s) => s.user); // Zustand에서 유저 상태 가져오기

  const handleNavItemClick = (path?: string) => {
    if (path) navigate(path);
    setMenuOpen(false);
  };

  const ProfileAndSeed = (
    <S.ProfileAndSeedContainer $isMobile={isMobile}>
      <S.ProfileContainer $isMobile={isMobile}>
        <S.ProfileImage
          src={user?.profileImageUrl || ProfileImage} // 프로필 이미지 fallback 처리
          alt={user?.name || "사용자"}
          $isMobile={isMobile}
        />
        <S.ProfileName $isMobile={isMobile}>
          {user?.name || "로그인 중..."}
        </S.ProfileName>
      </S.ProfileContainer>
      <S.RecordCount $isMobile={isMobile}>
        <span className="seed-text">내 씨앗</span>
        <span className="seed-count">{user?.totalSeed ?? 0}</span>
      </S.RecordCount>
    </S.ProfileAndSeedContainer>
  );

  return (
    <S.HeaderContainer $isMobile={isMobile}>
      <S.Logo onClick={() => navigate("/")} $isMobile={isMobile} $isTablet={isTablet}>
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

      {/* 모바일 메뉴 */}
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
  );
}
