// pages/index.tsx
import Auth from './components/index';
import StepStart from './components/StepStart';
import StepInputStudentId from './components/StepInputStudentId';
import StepCheckName from './components/StepCheckName';
import StepAuthComplete from './components/StepAuthComplete';
// import StepErrorInvalidId from '@/components/StepErrorInvalidId';
// import StepNotMember from '@/components/StepNotMember';
import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthPage() {
  const { step } = useAuthStore();

  return (
    <Auth>
      {step === 'start' && <StepStart />}
      {step === 'input' && <StepInputStudentId />}
      {step === 'check-name' && <StepCheckName />}
      {step === 'complete' && <StepAuthComplete />}
      {/* 
      {step === 'error' && <StepErrorInvalidId />}
      {step === 'not-member' && <StepNotMember />}
       */}
    </Auth>
  );
}
