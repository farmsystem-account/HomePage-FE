import { create } from 'zustand';
import { persist, combine } from 'zustand/middleware';

type AuthStep =
  | 'start'
  | 'input'
  | 'check-name'
  | 'error'
  | 'not-member'
  | 'complete';

interface AuthState {
  step: AuthStep;
  studentId: string;
  userName: string;
  errorMessage: string | null;
  errorTitle: string | null; 
}

export const useAuthStore = create(
  persist(
    combine<AuthState, any>(
      {
        step: 'start',
        studentId: '',
        userName: '',
        errorMessage: null,
        errorTitle: null,
      },
      (set) => ({
        setStep: (step: AuthStep) => set({ step }),
        setStudentId: (studentId: string) => set({ studentId }),
        setUserName: (userName: string) => set({ userName }),
        setErrorMessage: (msg: string | null) => set({ errorMessage: msg }),
        setErrorTitle: (title: string | null) => set({ errorTitle: title }),
        reset: () =>
          set({
            step: 'start',
            studentId: '',
            userName: '',
            errorMessage: null,
          }),
      })
    ),
    {
      name: 'auth-storage', 
      partialize: (state) => ({ studentId: state.studentId }), 
    }
  )
);
