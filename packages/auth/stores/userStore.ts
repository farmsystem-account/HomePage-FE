import { create } from "zustand";
import { persist, combine } from "zustand/middleware";

export interface UserInfo {
  userId: number;
  role: "USER" | "ADMIN";
  name: string;
  studentNumber: string;
  major: string;
  profileImageUrl: string;
  phoneNumber: string;
  notionAccount: string;
  githubAccount: string;
  track: string;
  generation: number;
  currentSeed: number;
  totalSeed: number;
}

interface UserState {
  user: UserInfo | null;
}

interface UserActions {
  setUser: (user: UserInfo) => void;
  clearUser: () => void;
}

export const useUserStore = create(
  persist(
    combine<UserState, UserActions>(
      { user: null },
      (set) => ({
        setUser: (user: UserInfo) => set({ user }),
        clearUser: () => set({ user: null }),
      })
    ),
    { name: "user-storage" }
  )
);
