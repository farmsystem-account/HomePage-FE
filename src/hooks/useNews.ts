import { useState, useEffect } from 'react';
import { getNews, getNewsById } from '@/services/news';
import { NewsGETResponse, NewsIdGETResponse } from '@/models/news';
import { handleApiError } from '@/utils/handleApiError';

/** 소식 목록 불러오기 */
export const useNewsList = () => {
  const [data, setData] = useState<NewsGETResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getNews()
      .then(setData)
      .catch((err) => setError(handleApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
};

/** 소식 상세 불러오기 */
export const useNewsDetail = (newsId: number) => {
  const [data, setData] = useState<NewsIdGETResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    getNewsById(newsId)
      .then(setData)
      .catch((err) => setError(handleApiError(err)))
      .finally(() => setLoading(false));
  }, [newsId]);

  return { data, loading, error };
};