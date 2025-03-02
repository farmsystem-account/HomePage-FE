import { GoogleOAuthProvider } from "@react-oauth/google";
import { useKakaoLogin } from "../../hooks/useKakaoLogin";
import { useGoogleLoginHook } from "../../hooks/useGoogleLogin";

const LoginPageContent = () => {
  const { isKakaoInitialized, authCode, handleKakaoLogin } = useKakaoLogin();
  const { login: googleLogin } = useGoogleLoginHook();

  return (
    <div>
      <h1>Login Page</h1>
      {isKakaoInitialized ? (
        <>
          <button onClick={handleKakaoLogin}>Login with Kakao</button>
          <button onClick={() => googleLogin()}>Login with Google</button>
          {authCode && <p>Authorization Code: {authCode}</p>}
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

// 현재 `GoogleOAuthProvider`를 `LoginPage.tsx` 내부에서 직접 감싸도록 되어있으나 회원가입 페이지와 마찬가지로 추후 분리 예정
const LoginPage = () => {
  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <LoginPageContent />
    </GoogleOAuthProvider>
  );
};

export default LoginPage;
