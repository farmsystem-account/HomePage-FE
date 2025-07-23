import { create } from 'zustand';
import { fetchLinkPreview, APIResponse } from '@/hooks/useLinkPreview';

interface LinkPreviewState {
  previewMap: Map<string, APIResponse>;
  loadingMap: Map<string, boolean>;
  getPreview: (url: string) => Promise<void>;
  getPreviewBatch: (urls: string[]) => Promise<void>;
}

export const useLinkPreviewStore = create<LinkPreviewState>((set, get) => ({
  previewMap: new Map(),
  loadingMap: new Map(),
  getPreview: async (url: string) => {
    if (get().previewMap.has(url)) return;
    set(state => {
      const loadingMap = new Map(state.loadingMap);
      loadingMap.set(url, true);
      return { ...state, loadingMap };
    });
    try {
      const metadata = await fetchLinkPreview(url);
      if (metadata) {
        set(state => {
          const previewMap = new Map(state.previewMap);
          previewMap.set(url, metadata);
          const loadingMap = new Map(state.loadingMap);
          loadingMap.set(url, false);
          return { ...state, previewMap, loadingMap };
        });
      } else {
        set(state => {
          const loadingMap = new Map(state.loadingMap);
          loadingMap.set(url, false);
          return { ...state, loadingMap };
        });
      }
    } catch {
      set(state => {
        const loadingMap = new Map(state.loadingMap);
        loadingMap.set(url, false);
        return { ...state, loadingMap };
      });
    }
  },
  getPreviewBatch: async (urls: string[]) => {
    for (const url of urls) {
      await get().getPreview(url);
    }
  }
})); 