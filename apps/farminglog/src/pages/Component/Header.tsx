import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import * as S from './Header.styled';
import LogoImage from '../../assets/home/farming_log.png';
import CloseIcon from '../../assets/react.svg';
import ProfileImage from '../../assets/home/default_profile.png';
import useMediaQueries from '../../../../website/src/hooks/useMediaQueries';

const SeedCount = 678;
const user = {
  name: '팜하니',
  profileImage: ProfileImage,
};

export default function Header() {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { isMobile, isTablet } = useMediaQueries();

  const handleNavItemClick = (path?: string) => {
    if (path) navigate(path);
    setMenuOpen(false);
  };

  return (
    <S.HeaderContainer $isMobile={isMobile}>
      {isMobile ? (
        <S.MobileHeader>
          <S.Logo onClick={() => navigate('/')} $isMobile={isMobile} $isTablet={isTablet}>
            <img src={LogoImage} alt="파밍로그" />
          </S.Logo>
          {/* 프로필 + 씨앗 카운트 영역 */}
          <S.ProfileAndSeedContainer $isMobile={isMobile}>
            <S.ProfileContainer $isMobile={isMobile}>
              <S.ProfileImage src={user.profileImage} alt={user.name} $isMobile={isMobile} />
              <S.ProfileName $isMobile={isMobile}>{user.name}</S.ProfileName>
            </S.ProfileContainer>
            <S.RecordCount $isMobile={isMobile}>
              <span className="seed-text">내 씨앗</span>
              <span className="seed-count">{SeedCount}</span>
            </S.RecordCount>
          </S.ProfileAndSeedContainer >
        </S.MobileHeader>
      ) : (
        <>
          <S.Logo onClick={() => navigate('/')} $isMobile={isMobile} $isTablet={isTablet}>
            <img src={LogoImage} alt="파밍로그" />
          </S.Logo>

          <S.NavWrapper>
            <S.Nav>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => navigate('/')} 
                isActive={location.pathname === '/'}
              >
                홈
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => navigate('/')} 
                isActive={location.pathname === '/'}
              >
                응원하기
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => navigate('/')} 
                isActive={location.pathname === '/'}
              >
                파밍로그
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => navigate('/')} 
                isActive={location.pathname === '/'}
              >
                랭킹
              </S.NavItem>
            </S.Nav>
          </S.NavWrapper>

          {/* 프로필 + 씨앗 카운트 영역 */}
          <S.ProfileAndSeedContainer $isMobile={isMobile}>
            <S.ProfileContainer $isMobile={isMobile}>
              <S.ProfileImage src={user.profileImage} alt={user.name} $isMobile={isMobile} />
              <S.ProfileName $isMobile={isMobile}>{user.name}</S.ProfileName>
            </S.ProfileContainer>
            <S.RecordCount $isMobile={isMobile}>
              <span className="seed-text">내 씨앗</span>
              <span className="seed-count">{SeedCount}</span>
            </S.RecordCount>
          </S.ProfileAndSeedContainer >
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
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => handleNavItemClick('/')} 
                isActive={location.pathname === '/'}
              >
                홈
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => handleNavItemClick('/')} 
                isActive={location.pathname === '/'}
              >
                블로그 / 프로젝트
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => handleNavItemClick('/')} 
                isActive={location.pathname === '/'}
              >
                소식
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile} 
                onClick={() => handleNavItemClick('/')} 
                isActive={location.pathname === '/'}
              >
                응원하기
              </S.NavItem>
              <S.NavItem 
                $isTablet={isTablet} 
                $isMobile={isMobile}
                onClick={() => handleNavItemClick('/')}
                isActive={location.pathname === '/'}
              >
                파밍로그
              </S.NavItem>
            </S.MobileNav>
          </>
        )}
      </S.MobileNavWrapper>
    </S.HeaderContainer>
  );
}
