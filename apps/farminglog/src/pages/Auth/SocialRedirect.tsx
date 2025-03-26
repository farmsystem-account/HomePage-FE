import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useSocialLoginPostMutation } from "@repo/auth/services/mutation/useSocialLoginPostMutation";
import { useAuthStore } from "@/stores/useAuthStore";

export default function SocialRedirect() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { mutate: login, status } = useSocialLoginPostMutation();
  const { setStep, setErrorMessage } = useAuthStore();


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
          // const message = error?.response?.data?.message;

          if (status === 404) {
            // alert("회원 인증이 실패했습니다.\n입력한 학번을 다시 확인해주세요.");
            setStep("not-member");
            navigate("/");
            setErrorMessage('해당 학번으로 등록된 회원이 없습니다.<br>운영진에게 문의해주세요.');
          } else if (status === 409) {
            // alert("이미 다른 소셜 계정으로 가입된 사용자입니다.\n다른 계정으로 로그인해주세요.");
            setStep("not-member");
            navigate("/");
            setErrorMessage('이미 다른 소셜 계정으로 가입된 사용자입니다.<br>다른 계정으로 로그인해주세요.');
          } else if (status === 500) {
            // alert("소셜 로그인 중 오류가 발생했습니다.\n잠시 후 다시 시도해주세요.");
            setStep("not-member");
            navigate("/");
            setErrorMessage('해당 학번으로 등록된 회원이 없습니다.<br>운영진에게 문의해주세요.');
          } else {
            // alert(message || "알 수 없는 오류가 발생했습니다.");
            setStep("not-member");
            navigate("/");
            setErrorMessage('해당 학번으로 등록된 회원이 없습니다.<br>운영진에게 문의해주세요.');
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
