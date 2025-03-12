import { useState, useRef } from 'react';
import styled from 'styled-components';
import { useCreateApply, useLoadApply } from '@/hooks/useApply';
import Logger from '@/utils/Logger';

interface ApplyLoginProps {
  isFirst: boolean;
  onSubmit: (studentNumber: string, password: string) => void;
}

export default function ApplyLogin({ isFirst, onSubmit }: ApplyLoginProps) {
  const [studentNumber, setStudentNumber] = useState("");
  const [passwordDigits, setPasswordDigits] = useState(Array(6).fill(""));

  const { createApply, loading: createLoading, error: createError } = useCreateApply();
  const { loadApply, loading: loadLoading, error: loadError } = useLoadApply();

  // isFirst 여부에 따라 로딩과 에러 상태를 분리합니다.
  const loading = isFirst ? createLoading : loadLoading;
  const error = isFirst ? createError : loadError;

  // 각 비밀번호 input에 대한 ref (포커스 이동용)
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleStudentNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStudentNumber(e.target.value);
  };

  const handleDigitChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.slice(0, 1); // 한 자리만 허용
    const newDigits = [...passwordDigits];
    newDigits[index] = newValue;
    setPasswordDigits(newDigits);
    // 현재 칸에 값이 입력되면 다음 칸으로 포커스 이동 (마지막 칸이 아니라면)
    if (newValue && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleSubmit = () => {
    const password = passwordDigits.join("");
    if (isFirst) {
      // 최초 지원서 작성: 계정 생성 요청
      createApply({ studentNumber, password })
        .then((applyId) => {
          Logger.log("계정 생성 성공, applyId:", applyId);
          onSubmit(studentNumber, password);
        })
        .catch((err) => {
          Logger.error("계정 생성 에러:", err);
        });
    } else {
      // 기존 계정: 로그인 요청 (loadApply 사용)
      loadApply({ studentNumber, password })
        .then((applyData) => {
          Logger.log("로그인 성공:", applyData);
          onSubmit(studentNumber, password);
        })
        .catch((err) => {
          Logger.error("로그인 에러:", err);
        });
    }
  };

  return (
    <LoginContainer>
      <Title>{isFirst ? "계정 생성" : "로그인"}</Title>
      <FieldContainer>
        <Label>학번:</Label>
        <Input
          type="text"
          value={studentNumber}
          onChange={handleStudentNumberChange}
          placeholder="학번을 입력하세요"
        />
      </FieldContainer>
      <FieldContainer>
        <Label>비밀번호:</Label>
        <DigitContainer>
          {passwordDigits.map((digit, index) => (
            <DigitInput
              key={index}
              type="password"
              maxLength={1}
              value={digit}
              onChange={(e) => handleDigitChange(index, e)}
              ref={(el) => (inputsRef.current[index] = el)}
            />
          ))}
        </DigitContainer>
      </FieldContainer>
      <SubmitButton onClick={handleSubmit}>
        {isFirst ? "계정 생성" : "로그인"}
      </SubmitButton>
      {loading && <div>처리중...</div>}
      {error && <div style={{ color: "red" }}>{error.message}</div>}
    </LoginContainer>
  );
}

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 1.5rem;
  margin-bottom: 24px;
`;

const FieldContainer = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  font-size: 1rem;
`;

const DigitContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const DigitInput = styled.input`
  width: 40px;
  height: 40px;
  text-align: center;
  font-size: 1.2rem;
`;

const SubmitButton = styled.button`
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
`;
