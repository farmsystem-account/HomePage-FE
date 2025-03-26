import styled from "styled-components";

export const HeaderContainer = styled.header<{ $isMobile: boolean }>`
  position: fixed;
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? "55px" : "70px")}; 
  background: linear-gradient(270deg, #29D4A7 0%, #5CD282 100%);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $isMobile }) => ($isMobile ? "0 0px 0px 20px" : "0 0px 0px 25px")}; 
  z-index: 1000;
`;

export const MobileHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div<{ $isMobile: boolean, $isTablet: boolean }>`
  width: ${({ $isMobile, $isTablet }) => ($isMobile ? "100px" : $isTablet ? "150px" :  "200px")}; 
  cursor: pointer;
  user-select: none;
  padding-right: ${({ $isMobile, $isTablet }) => ($isMobile ? "20px" : $isTablet ? "25px" :  "50px")}
`;

export const NavWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 35px;
  flex-grow: 1;
`;

export const Nav = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

export const NavItem = styled.a<{ $isMobile: boolean; $isTablet: boolean; isActive: boolean }>`
  text-decoration: none;
  padding: ${({$isMobile, $isTablet}) => 
    $isMobile ? "0 20px" : $isTablet ? "0 20px" : "0 30px"};
  font-size: ${({$isMobile, $isTablet}) => 
    $isMobile ? "15px" : $isTablet ? "15px" : "18px"};
  font-weight: 500;
  color: white;
  cursor: pointer;
  position: relative;

  &:hover {
    color: #FFFAA4;
  }

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -2px;
    width: 100%;
    height: 2px;
    background-color: white;
    padding: 0px 2px;
  }

  &:hover::after {
    background-color: #FFFAA4; /* 호버 시 라인 색상 변경 */
  }
`;

export const RecordCount = styled.div<{ $isMobile: boolean }>`
  /* 절대 위치로 부모 범위를 벗어나도록 배치 */
  position: absolute;
  right: -20px; 
  padding-left: 10px;
  top: 50%;     
  transform: translateY(-50%);

  /* $isMobile 여부에 따라 크기 조정 */
  width: ${({ $isMobile }) => ($isMobile ? "120px" : "170px")};
  height: ${({ $isMobile }) => ($isMobile ? "40px" : "50px")};
  border-radius: 30px;
  background: #FFFAA4;

  /* 중앙 정렬 */
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;

  .seed-text {
    color: #1CC08B;
    font-weight: 600;
    font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "16px")};
  }

  .seed-count {
    color: #333;
    font-size: ${({ $isMobile }) => ($isMobile ? "20px" : "28px")};
    font-weight: 700;
    line-height: ${({ $isMobile }) => ($isMobile ? "30px" : "40px")};
    letter-spacing: -0.24px;
  }
`;

export const HamburgerIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

export const MobileNavWrapper = styled.div<{ $isMenuOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgb(245, 245, 245); 
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ $isMenuOpen }) => ($isMenuOpen ? "20px 0" : "0")};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  height: ${({ $isMenuOpen }) => ($isMenuOpen ? "auto" : "0")};
  opacity: ${({ $isMenuOpen }) => ($isMenuOpen ? "1" : "0")};
  transform: ${({ $isMenuOpen }) => ($isMenuOpen ? "translateY(0)" : "translateY(-100%)")};
  transition: transform 0.3s ease, opacity 0.3s ease, height 0.3s ease;
  overflow: hidden;
`;

export const CloseButton = styled.img`
  position: absolute;
  top: 19px;
  right: 20px;
  cursor: pointer;
  width: 26px;  
  height: 26px;
`;

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 25px; 
  margin-top: 20px;
`;

export const ProfileAndSeedContainer = styled.div<{ $isMobile: boolean }>`
  position: relative;
  overflow: hidden;

  /* $isMobile에 따라 크기 조정 */
  width: ${({ $isMobile }) => ($isMobile ? "200px" : "240px")};
  height: ${({ $isMobile }) => ($isMobile ? "50px" : "60px")};

  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ProfileContainer = styled.div<{ $isMobile: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;

  height: ${({ $isMobile }) => ($isMobile ? "50px" : "60px")};
`;

export const ProfileImage = styled.img<{ $isMobile: boolean }>`
  width: ${({ $isMobile }) => ($isMobile ? "24px" : "30px")};
  height: ${({ $isMobile }) => ($isMobile ? "24px" : "30px")};
  border-radius: 50%;
  object-fit: cover;
  background: white;
`;

export const ProfileName = styled.div<{ $isMobile: boolean }>`
  padding: 0 10px;
  font-size: ${({ $isMobile }) => ($isMobile ? "14px" : "16px")};
  font-weight: 600;
  color: black;
`;
