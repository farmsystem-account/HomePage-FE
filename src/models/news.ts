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
export type newsPOSTRequest = Omit<newsData, "newsId">;
export type newsPOSTResponse = newsData | newsErrorResponse;
export type newsPUTRequest = Omit<newsData, "newsId">;
export type newsPUTResponse = newsData | newsErrorResponse;
export type newsIdDELETEResponse = newsData | newsErrorResponse;