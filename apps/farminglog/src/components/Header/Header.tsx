import { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import * as S from "./Header.styled";
import LogoImage from "../../assets/home/farming_log.png";
import CloseIcon from "../../assets/Icons/BackArrow.png";
import ProfileImage from "../../assets/home/default_profile.png";
import useMediaQueries from "@/hooks/useMediaQueries";
import Popup from "@/components/Popup/popup"; 
import { useUserInfoQuery } from "@repo/auth/services/query/useUserInfoQuery";
import { convertTrackToString } from "@/utils/convertTrackToString";
// import { useUserStore } from "@repo/auth/stores/userStore";

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
  // const user = useUserStore((s) => s.user);
  const { data: user } = useUserInfoQuery(); // false로 설정하여 자동으로 fetch하지 않도록 함

  const name = user?.name;
  const profileImageUrl = user?.profileImageUrl;
  const totalSeed = user?.totalSeed;

  const handleNavItemClick = (path?: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (path) navigate(path);
    setMenuOpen(false);
  };

  // 헤더의 빈 영역 클릭 시 모바일 메뉴 열기
  const handleHeaderClick = () => {
    if (isMobile && !isMenuOpen) {
      setMenuOpen(true);
    }
  };

  const ProfileAndSeed = (
    <S.ProfileAndSeedContainer $isMobile={isMobile} $isTablet={isTablet}>
      <S.ProfileContainer 
        $isMobile={isMobile}
        onClick={(e) => {
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
      <S.RecordCount $isMobile={isMobile} $isTablet={isTablet}>
        <span className="seed-text">내 씨앗</span>
        <span className="seed-count">{totalSeed ?? 0}</span>
      </S.RecordCount>
    </S.ProfileAndSeedContainer>
  );

  return (
    <>
      <S.HeaderContainer $isMobile={isMobile} onClick={handleHeaderClick}>
        <S.Logo 
          onClick={(e) => {
            e.stopPropagation();
            navigate("/home");
          }} 
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
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(path);
                    }}
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
          {isMobile && isMenuOpen && (
            <>
              <S.CloseButton
                src={CloseIcon}
                alt="Close"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpen(false);
                }}
              />
              <S.MobileNav>
                {navItems.map(({ label, path }) => (
                  <S.NavItem
                    key={path}
                    $isTablet={isTablet}
                    $isMobile={isMobile}
                    onClick={(e) => handleNavItemClick(path, e)}
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
        generationAndPart={
          user?.generation && user?.track
            ? `${user.generation}기 ${convertTrackToString(user.track)}`
            : "기수 정보 없음"
        }
        profileImg={user?.profileImageUrl} 
        hasLogout={true}       
      />
    </>
  );
}
