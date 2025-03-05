import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useKakaoLogin } from "../../hooks/useKakaoLogin";

const KakaoRedirect = () => {
  const navigate = useNavigate();  
  const { handleAuthorizationCode } = useKakaoLogin();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      handleAuthorizationCode(code).then(() => {
        navigate("/"); 
      });
    } else {
      console.error("인가 코드가 없습니다.");
    }
  }, [handleAuthorizationCode, navigate]);

  return <div>로그인 처리 중...</div>;
};

export default KakaoRedirect;
