import { create } from 'zustand';
import { APIResponse, isValidResponse } from '@/hooks/useLinkPreview';

interface LinkPreviewState {
  previewMap: Map<string, APIResponse>;
  loadingMap: Map<string, boolean>;
  getPreview: (url: string) => Promise<void>;
  getPreviewBatch: (urls: string[]) => Promise<void>;
}

// 프록시 서버 URL (useLinkPreview와 동일)
const proxyUrl = 'https://corsproxy.io/?url=';

/**
 * extractMetaContent
 * 정규표현식을 사용하여 HTML에서 meta 태그의 content 값을 추출합니다.
 */
const extractMetaContent = (html: string, key: string): string => {
  const regex = new RegExp(
    `<meta[^>]*(?:property|name)=["']${key}["'][^>]*content=["']([^"']*)["'][^>]*>`,
    'i'
  );
  const match = html.match(regex);
  return match ? match[1] : '';
};

/**
 * cleanHTML
 * HTML 문자열에서 주석을 제거합니다.
 */
const cleanHTML = (html: string): string => {
  return html.replace(/<!--[\s\S]*?-->/g, '');
};

/**
 * parseHTML
 * HTML 문자열을 파싱하여 OG 메타 태그 정보를 추출합니다.
 */
const parseHTML = (html: string, originalUrl: string): APIResponse => {
  const clean = cleanHTML(html);
  const parser = new DOMParser();
  const doc = parser.parseFromString(clean, 'text/html');

  // OG 메타 태그 추출
  let title =
    doc.querySelector('meta[property="og:title"], meta[name="og:title"]')?.getAttribute('content') || '';
  let description =
    doc.querySelector('meta[property="og:description"], meta[name="og:description"]')?.getAttribute('content') || '';
  let image =
    doc.querySelector('meta[property="og:image"], meta[name="og:image"]')?.getAttribute('content') || '';
  let siteName =
    doc.querySelector('meta[property="og:site_name"], meta[name="og:site_name"]')?.getAttribute('content') || '';
  let ogUrl =
    doc.querySelector('meta[property="og:url"], meta[name="og:url"]')?.getAttribute('content') || originalUrl;
  
  // fallback: 정규표현식으로 추출
  if (!title) title = extractMetaContent(clean, 'og:title');
  if (!description) description = extractMetaContent(clean, 'og:description');
  if (!image) image = extractMetaContent(clean, 'og:image');
  if (!siteName) siteName = extractMetaContent(clean, 'og:site_name');
  if (!ogUrl) ogUrl = originalUrl;

  // hostname 추출
  let hostname = '';
  try {
    hostname = new URL(ogUrl).hostname;
  } catch {
    hostname = '';
  }

  return { title, description, image, siteName, hostname };
};


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
      // 프록시를 통한 요청 URL 구성
      const proxyFetchUrl = proxyUrl + encodeURIComponent(url);
      
      const response = await fetch(proxyFetchUrl);
      const html = await response.text();
      
      const parsedData = parseHTML(html, url);
      
      if (isValidResponse(parsedData)) {
        set(state => {
          const previewMap = new Map(state.previewMap);
          previewMap.set(url, parsedData);
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
    } catch (error) {
      console.error('Error fetching link preview:', error);
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