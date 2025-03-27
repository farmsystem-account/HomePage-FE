import { createBrowserRouter } from "react-router";
import { protectedLoader } from "../../../../packages/router/protectedLoader";

import Home from "../pages/home";
import Auth from "../pages/Auth";
import SocialRedirect from "@/pages/Auth/SocialRedirect";
import Cheer from "../pages/cheer";
import View from "../pages/farminglog/view";
import Create from "../pages/farminglog/create";
import Mypage from "../pages/MyPage";
import Ranking from "@/pages/home/Ranking/ranking";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />, 
  },
  {
    path: '/auth/redirect',
    element: <SocialRedirect />,
 },
  {
    path: "/home",
    loader: protectedLoader,
    element: <Home />,
  },
  {
    path: "/cheer",
    loader: protectedLoader,
    element: <Cheer />,
  },
  {
    path: "/farminglog/view",
    loader: protectedLoader,
    element: <View />,
  },
  {
    path: "/farminglog/create",
    loader: protectedLoader,
    element: <Create />,
  },
  {
    path: "/mypage",
    loader: protectedLoader,
    element: <Mypage />,
  }, 
  {
    path: "/ranking",
    loader: protectedLoader,
    element: <Ranking />,
  },
]);
