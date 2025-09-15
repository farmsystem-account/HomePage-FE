import * as S from '../styles/StepInputStudentId.styled';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';
import { useState } from 'react';
import useMediaQueries from '@/hooks/useMediaQueries';
import { useUserVerifyMutation } from '@repo/api/services/mutation/useUserVerifyMutation';

export default function StepInputStudentId() {
  const {
    setStep,
    setStudentId,
    setUserName,
    setErrorMessage,
    errorMessage,
  } = useAuthStore();
  const [input, setInput] = useState('');
  const { isMobile } = useMediaQueries();
  const mutation = useUserVerifyMutation();

const handleNext = () => {
  if (!input.trim()) {
    setErrorMessage('학번을 입력해주세요.');
    return;
  }

  setStudentId(input);

  mutation.mutate(
    { studentNumber: input },
    {
      onSuccess: (data) => {
        if (data.isVerified) {
          setUserName(data.name);
          setErrorMessage(null);
          setStep('check-name');
        } else {
          setErrorMessage('회원 인증에 실패했습니다.');
        }
      },
      onError: (err: unknown) => {
        if ((err as { status?: number })?.status === 401 || (err as { status?: number })?.status === 404) {
          setStep('not-member');
        } else {
          setErrorMessage('서버 오류입니다. 운영진에게 문의해주세요.');
        }
      }
    }
  );
};


  return (
    <S.Container $isMobile={isMobile}>
      <S.LogoIcon $isMobile={isMobile} />
      <S.Title $isMobile={isMobile}>Farm System 회원 인증</S.Title>
      <S.SubTitle $isMobile={isMobile}>
        Farm System 회원임을 인증하기 위한 <br /> 학번을 입력해주세요!
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
      <S.Button
        onClick={handleNext}
        $isMobile={isMobile}
        disabled={mutation.isPending}
      >
        {mutation.isPending ? '인증 중...' : '인증하기'}
      </S.Button>
      {errorMessage && (
        <S.ErrorMessage $isMobile={isMobile}>
          {errorMessage}
        </S.ErrorMessage>
      )}
    </S.Container>
  );
}
