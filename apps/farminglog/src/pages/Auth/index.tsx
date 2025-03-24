// pages/index.tsx
import Auth from './components/index';
import StepStart from './components/StepStart';
// import StepInputStudentId from '@/components/StepInputStudentId';
// import StepCheckName from '@/components/StepCheckName';
// import StepErrorInvalidId from '@/components/StepErrorInvalidId';
// import StepNotMember from '@/components/StepNotMember';
// import StepAuthComplete from '@/components/StepAuthComplete';
import { useAuthStore } from '@/stores/useAuthStore';

export default function AuthPage() {
  const { step } = useAuthStore();

  return (
    <Auth>
      {step === 'start' && <StepStart />}
      {/* {step === 'input' && <StepInputStudentId />}
      {step === 'check-name' && <StepCheckName />}
      {step === 'error' && <StepErrorInvalidId />}
      {step === 'not-member' && <StepNotMember />}
      {step === 'complete' && <StepAuthComplete />} */}
    </Auth>
  );
}
