interface newsData {
  newsId: number;
  title: string;
  content: string;
};

interface newsErrorResponse {
  status: number;
  message: string;
  data: string;
}

// /api/news
export type NewsGETResponse = newsData[];
export type NewsIdGETResponse = newsData | newsErrorResponse;

// /api/admin/news
// 추후 관리자 페이지에 사용할 모델들
export type AdminNewsPOSTRequest = Omit<newsData, "newsId">;
export type AdminNewsPOSTResponse = newsData | newsErrorResponse;
export type AdminNewsPUTRequest = Omit<newsData, "newsId">;
export type AdminNewsPUTResponse = newsData | newsErrorResponse;
export type AdminNewsIdDELETEResponse = newsData | newsErrorResponse;