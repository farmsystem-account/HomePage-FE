import { create } from 'zustand';

interface ErrorState {
  errorMessage: string | null;
  errorTitle: string | null;
  buttonLabel: string;
  setErrorMessage: (msg: string | null) => void;
  setErrorTitle: (title: string | null) => void;
  setButtonLabel: (label: string) => void;
  resetError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorMessage: null,
  errorTitle: null,
  buttonLabel: '회원인증 하기',
  setErrorMessage: (msg) => set({ errorMessage: msg }),
  setErrorTitle: (title) => set({ errorTitle: title }),
  setButtonLabel: (label) => set({ buttonLabel: label }),
  resetError: () => set({ errorMessage: null, errorTitle: null, buttonLabel: '회원인증 하기' }),
}));