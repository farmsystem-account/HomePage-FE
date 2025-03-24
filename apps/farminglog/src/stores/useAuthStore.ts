import { create } from 'zustand';

type AuthStep =
  | 'start'
  | 'input'
  | 'check-name'
  | 'error'
  | 'not-member'
  | 'complete';

interface AuthStore {
  step: AuthStep;
  studentId: string;
  userName: string;
  errorMessage: string | null;
  setStep: (step: AuthStep) => void;
  setStudentId: (id: string) => void;
  setUserName: (name: string) => void;
  setErrorMessage: (msg: string | null) => void;
  reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  step: 'start',
  studentId: '',
  userName: '',
  errorMessage: null,
  setStep: (step) => set({ step }),
  setStudentId: (studentId) => set({ studentId }),
  setUserName: (userName) => set({ userName }),
  setErrorMessage: (msg) => set({ errorMessage: msg }),
  reset: () =>
    set({
      step: 'start',
      studentId: '',
      userName: '',
      errorMessage: null,
    }),
}));

