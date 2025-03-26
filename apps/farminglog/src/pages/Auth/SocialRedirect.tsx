import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSocialLoginPostMutation } from "@repo/auth/services/mutation/useSocialLoginPostMutation";

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: login, status } = useSocialLoginPostMutation();


  const isLoading = status === "pending";

  useEffect(() => {
    const code = params.get("code");
    const provider = (params.get("state") || params.get("provider"))?.toUpperCase() as "KAKAO" | "GOOGLE";

    if (!code || (provider !== "KAKAO" && provider !== "GOOGLE")) {
      console.error("소셜 로그인 파라미터 누락 또는 잘못됨");
      navigate("/?error=invalid_params");
      return;
    }

    login(
      { code, socialType: provider },
      {
        onSuccess: () => {
          navigate("/home");
        },
       onError: (error: any) => {
  const status = error?.response?.status;

  if (status === 404) {
    navigate("/?status=not-member&type=404", { replace: true });
  } else if (status === 409) {
    navigate("/?status=not-member&type=409", { replace: true });
  } else if (status === 500) {
    navigate("/?status=not-member&type=500", { replace: true });
  } else {
    navigate("/?error=unknown", { replace: true });
  }
},

      }
    );
  }, [params, login, navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "4rem" }}>
      <h2>{isLoading ? "로그인 중입니다..." : "소셜 로그인 처리 중입니다..."}</h2>
    </div>
  );
}
