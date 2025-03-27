import { Outlet } from "react-router";
import styled from "styled-components";
import useMediaQueries from "@/hooks/useMediaQueries";
import Header from "./Header/Header";

import { useUserInfoQuery } from "@repo/auth/services/query/useUserInfoQuery";

export default function Layout() {
  const { isMobile } = useMediaQueries();
  const headerHeight = isMobile ? 55 : 70;

  // accessToken 존재 여부로 fetch 제어 이건 나중에 리펙토링 필요... 모든 화면마다 계속 패치 중...
  const accessToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;
  const isLoggedIn = !!accessToken;

  useUserInfoQuery(isLoggedIn);

  return (
    <LayoutWrapper>
      <HeaderWrapper>
        <Header />
      </HeaderWrapper>
      <Main $paddingTop={headerHeight}>
        <Outlet />
      </Main>
    </LayoutWrapper>
  );
}

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
`;

const Main = styled.main<{ $paddingTop: number }>`
  padding-top: ${({ $paddingTop }) => `${$paddingTop}px`};
  flex: 1;
`;