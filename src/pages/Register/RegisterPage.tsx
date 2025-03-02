import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useVerifyStudent } from "../../hooks/useVerifyStudent";

// QueryClient 인스턴스 생성
const queryClient = new QueryClient();

const RegisterPageContent = () => {
  const [studentNumber, setStudentNumber] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const { data, error, isLoading, refetch } = useVerifyStudent(studentNumber, false);

  const handleSubmit = () => {
    setSubmitted(true);
    refetch(); 
  };

  return (
    <div>
      <h1>Register Page</h1>
      <input
        type="text"
        value={studentNumber}
        onChange={(e) => setStudentNumber(e.target.value)}
        placeholder="Enter student number"
      />
      <button onClick={handleSubmit} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </button>

      {submitted && (
        <div>
          {isLoading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {data && <p>Verification Result: {JSON.stringify(data)}</p>}
        </div>
      )}
    </div>
  );
};

// 현재 `QueryClientProvider`를 `RegisterPage.tsx` 내에서 직접 감쌌지만, 구조 구상 후 분리 예정
const RegisterPage = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RegisterPageContent />
    </QueryClientProvider>
  );
};

export default RegisterPage;
