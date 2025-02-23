import { create } from 'zustand';

interface ExampleState {
  data: any;
  setData: (data: any) => void;
}

const useExampleStore = create<ExampleState>((set) => ({
  data: null,
  setData: (data) => set({ data }),
}));

export default useExampleStore;