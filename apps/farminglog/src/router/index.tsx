import { createBrowserRouter } from "react-router";
import { protectedLoader } from "@repo/router/protectedLoader";

import Layout from "@/components/Layout";

import Home from "@/pages/home";
import Auth from "@/pages/auth";
import SocialRedirect from "@/pages/auth/SocialRedirect";
import Cheer from "@/pages/cheer";
import CheerWrite from "@/pages/cheer/write/";
import View from "@/pages/farminglog/view";
import Create from "@/pages/farminglog/create";
import Mypage from "@/pages/myPage";
import Ranking from "@/pages/home/Ranking/ranking";
import RankingDetail from "@/pages/ranking";
import Game from "@/pages/game";
import Error from "@/pages/error";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/auth/redirect",
    element: <SocialRedirect />,
  },

  {
    element: <Layout />, 
    errorElement: <Error />,
    children: [
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
        path: "/cheer/write",
        loader: protectedLoader,
        element: <CheerWrite />,
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
      {
        path: "/rankingDetail",
        loader: protectedLoader,
        element: <RankingDetail />,
      },
      {
        path: "/game",
        loader: protectedLoader,
        element: <Game />,
      },
    ],
  },
  {
    path: "*",
    element: <Error />, 
  },
]);
