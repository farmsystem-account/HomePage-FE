import { redirect } from "react-router";
import { getClientSideTokens } from "../api/utils/getClientSideTokens";
import Cookies from "js-cookie";

export const protectedLoader = async ({ request }: { request: Request }) => {
  if (typeof window !== "undefined") {
    const tokens = getClientSideTokens();
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 제한된 기능(글 작성, 출석/게임 등) 차단
    const isLimited = Cookies.get("limitWrite") === "true";
    const restrictedPaths = new Set([
      "/cheer/write",
      "/farminglog/create",
      "/farminglog/edit",
      "/game",
    ]);

    if (isLimited && restrictedPaths.has(pathname)) {
      return redirect("/home");
    }

    if (!tokens?.accessToken) {
      return redirect(`/?from=${pathname}`);
    }
  }

  return null; 
};
