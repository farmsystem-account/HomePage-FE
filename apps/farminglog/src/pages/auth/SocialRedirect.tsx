import { useRef, useEffect, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSocialLoginPostMutation } from "@repo/auth/services/mutation/useSocialLoginPostMutation";

import LoadingSkeleton from "@/components/Skeleton/LoadingSkeleton";

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: login } = useSocialLoginPostMutation();

    const isCalled = useRef(false); // 한 번만 호출되도록


  const code = useMemo(() => params.get("code"), [params]);
  const provider = useMemo(() => {
    const raw = params.get("state") || params.get("provider");
    return raw?.toUpperCase() as "KAKAO" | "GOOGLE" | undefined;
  }, [params]);

  useEffect(() => {
    if (!code || (provider !== "KAKAO" && provider !== "GOOGLE")) {
      // console.error("소셜 로그인 파라미터 누락 또는 잘못됨");
      navigate("/?error=invalid_params");
      return;
    }

    isCalled.current = true;

    login(
      { code, socialType: provider },
      {
        onSuccess: () => {
          navigate("/home");
        },
        onError: (error: any) => {
          const status = error?.response?.status;
          // console.error("소셜 로그인 에러:", error);

          if (!status) {
            navigate("/?error=network_or_unknown", { replace: true });
            return;
          }

          switch (status) {
            case 404:
              navigate("/?error=not-found", { replace: true });
              break;
            case 409:
              navigate("/?error=conflict", { replace: true });
              break;
            case 500:
              navigate("/?error=server-error", { replace: true });
              break;
            default:
              navigate("/?error=unknown", { replace: true });
          }
        },
      }
    );
  }, [code, provider, login, navigate]); 

  return (
     <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      width: "100%",
    }}
  >
    <LoadingSkeleton />
  </div>
  );
}
