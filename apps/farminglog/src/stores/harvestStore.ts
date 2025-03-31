import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ButtonStore {
  activeStates: boolean[];
  lastUpdate: number;
  setActive: (index: number) => void;
}

const useButtonStore = create<ButtonStore>()(
  persist(
    (set, get) => ({
      activeStates: [false, false, false],
      lastUpdate: Date.now(),
      setActive: (index: number) => {
        const currentStates = get().activeStates;
        // 이미 활성화되어 있지 않은 경우에만 활성화 (true로 설정)
        if (!currentStates[index]) {
          const newStates = [...currentStates];
          newStates[index] = true;
          set({ activeStates: newStates, lastUpdate: Date.now() });
        }
      },
    }),
    {
      name: "button-active-states", // localStorage 키로 사용됨
      version: 1,
      // migrate 함수에서 마지막 업데이트 시간이 오늘과 다르면 기본값으로 초기화
      migrate: (persistedState: any) => {
        const now = new Date();
        const lastUpdate = new Date(persistedState.lastUpdate);
        if (
          now.getFullYear() !== lastUpdate.getFullYear() ||
          now.getMonth() !== lastUpdate.getMonth() ||
          now.getDate() !== lastUpdate.getDate()
        ) {
          return {
            activeStates: [false, false, false],
            lastUpdate: Date.now(),
          };
        }
        return persistedState;
      },
    }
  )
);

export default useButtonStore;
