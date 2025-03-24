import * as S from '../styles/StepInputStudentId.styled';
import { useAuthStore } from '@/stores/useAuthStore';
import { useState } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';

export default function StepInputStudentId() {
  const { setStep, setStudentId } = useAuthStore();
  const [input, setInput] = useState('');
  const { isMobile } = useMediaQueries();

  const handleNext = () => {
    if (!input.trim()) return;
    setStudentId(input);
    setStep('check-name');
  };

  return (
      <S.Container $isMobile={isMobile}>
        <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>Farm System 회원 인증</S.Title>
    <S.SubTitle $isMobile={isMobile}>
      Farm System 회원임을 인증하기 위한 <br /> 학번을 입력해주세요.
    </S.SubTitle>

          <S.InputWrapper $isMobile={isMobile}>
              <p>학번</p>
        <S.Input
          type="text"
          placeholder="202512345"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          $isMobile={isMobile}
        />
      </S.InputWrapper>

      <S.Button onClick={handleNext} $isMobile={isMobile}>
        인증하기
      </S.Button>
      {/* <S.Back onClick={() => setStep('start')} $isMobile={isMobile}>
        ← 돌아가기
      </S.Back>  -> 페이지로 분리하지 않아서 돌아가기 버튼 필요*/}
    </S.Container>
  );
}
