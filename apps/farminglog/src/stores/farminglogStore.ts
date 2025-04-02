import { create } from 'zustand';

/**
 * 귀찮아서 미리 정의해둔 타입들 안땡겨오고 임시로 string으로 만들었습니다.
 */

interface FarmingLogStore {
  isNeedRefresh: boolean;
  setIsNeedRefresh: (isNeedRefresh: boolean) => void;

  isEditMode: boolean;
  farmingLogId: number | null;
  farminglogTitle: string;
  farminglogContent: string;
  farminglogCategory: string | null;

  setIsEditMode: (isEditMode: boolean) => void;
  setFarmingLogId: (id: number | null) => void;
  setFarminglogTitle: (farminglogTitle: string) => void;
  setFarminglogContent: (farminglogContent: string) => void;
  setFarminglogCategory: (farminglogCategory: string | null) => void;
}

const useFarmingLogStore = create<FarmingLogStore>((set) => ({
  // 리액트-쿼리 캐싱 리프레쉬
  isNeedRefresh: false,
  setIsNeedRefresh: (isNeedRefresh) => set(() => ({ isNeedRefresh })),

  isEditMode: false,  // 수정 모드인지 여부
  farmingLogId: null,
  farminglogTitle: '',
  farminglogContent: '',
  farminglogCategory: null,

  setIsEditMode: (isEditMode) => set(() => ({ isEditMode })),
  setFarmingLogId: (farmingLogId) => set(() => ({ farmingLogId })),
  setFarminglogTitle: (farminglogTitle) => set(() => ({ farminglogTitle })),
  setFarminglogContent: (farminglogContent) => set(() => ({ farminglogContent })),
  setFarminglogCategory: (farminglogCategory) => set(() => ({ farminglogCategory })),
}));

export default useFarmingLogStore;