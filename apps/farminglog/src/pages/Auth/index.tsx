import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import Auth from './components/index';
import StepStart from './components/StepStart';
import StepInputStudentId from './components/StepInputStudentId';
import StepCheckName from './components/StepCheckName';
import StepAuthComplete from './components/StepAuthComplete';
import StepNotMember from './components/StepNotMember';
import { useAuthStore } from '@repo/auth/stores/useAuthStore';

export default function AuthPage() {
  const { step, setStep, setErrorMessage,setErrorTitle } = useAuthStore();
  const [params] = useSearchParams();
  const status = params.get('status');
  const type = params.get('type');

  useEffect(() => {
    if (status === 'not-member') {

      setStep('not-member');

      if (type === '409') {
        setErrorTitle('이미 다른 소셜 계정으로 가입된 사용자입니다.');
        setErrorMessage('다른 계정으로 로그인해주세요.');
      } 

      // 쿼리 스트링 깔끔히 제거 -> 추후에 적용하고 싶으면 적용
      // window.history.replaceState({}, '', window.location.pathname);
    }
  }, [status, type, setStep, setErrorMessage]);

  return (
    <Auth>
      {step === 'start' && <StepStart />}
      {step === 'input' && <StepInputStudentId />}
      {step === 'check-name' && <StepCheckName />}
      {step === 'complete' && <StepAuthComplete />}
      {step === 'not-member' && <StepNotMember />}
    </Auth>
  );
}
