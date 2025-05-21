// 기본적인 Api 응답 형태
// 스웨거를 믿지마!! 응답을 믿어!!
interface ApiResponse<T = unknown> {
  status: number;
  message: string;
  data?: T
}

export interface newsListData {
  newsId: number;
  title: string;
  thumbnailUrl: string;
  contentPreview: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

// 단일 뉴스 데이터
export interface newsData {
  newsId: number;
  title: string;
  thumbnailUrl: string;
  content: string;
  imageUrls: string[];
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

// /api/news
export type NewsGETResponse = ApiResponse<newsListData[]>;
export type NewsIdGETResponse = ApiResponse<newsData>;

// /api/admin/news
// 추후 관리자 페이지에 사용할 모델들
export type AdminNewsPOSTRequest = Omit<newsData, "newsId">;
export type AdminNewsPOSTResponse = ApiResponse<newsData>;
export type AdminNewsPUTRequest = Omit<newsData, "newsId">;
export type AdminNewsPUTResponse = ApiResponse<newsData>;
export type AdminNewsIdDELETEResponse = ApiResponse<newsData>;