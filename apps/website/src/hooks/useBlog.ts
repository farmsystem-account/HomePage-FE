// useBlog.ts
import { useState, useEffect } from "react";
import { BlogGETResponse, BlogPOSTRequest, BlogPOSTResponse, BlogPage, PageableMeta, SortMeta } from "@/models/blog";
import { getBlogList, postBlog, getApprovedBlogList, getBlogPageList } from "@/services/blog";
import { handleApiError } from "@/utils/handleApiError";

/**
 * 블로그 목록 조회를 위한 커스텀 훅
 * 컴포넌트가 마운트될 때 getBlogList API를 호출하여 상태를 관리
 */
export const useBlogList = () => {
  const [data, setData] = useState<BlogGETResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getBlogList()
      .then((response) => {
        setData(response);
      })
      .catch((err) => setError(handleApiError(err)))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

/**
 * 블로그 신청을 위한 커스텀 훅
 * postNewBlog 함수를 호출하여 API 요청을 수행하며 상태를 관리
 */
export const usePostBlog = () => {
  const [data, setData] = useState<BlogPOSTResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const postNewBlog = async (blogData: BlogPOSTRequest) => {
    setLoading(true);
    setError(null);
    try {
      const response = await postBlog(blogData);
      setData(response);
      return response;
    } 
    catch (err) {
      const errorObj = handleApiError(err);
      setError(errorObj);
    } 
    finally {
      setLoading(false);
    }
  };

  return { data, loading, error, postNewBlog };
};

/**
 * 승인된 블로그 목록 조회를 위한 커스텀 훅
 * 컴포넌트가 마운트될 때 getApprovedBlogList API를 호출하여 상태 관리
 */
export const useApprovedBlogList = () => {
  const [data, setData] = useState<BlogPOSTResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    getApprovedBlogList()
      .then((response) => {
        setData(response);
      })
      .catch((err) => setError(handleApiError(err)))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
};

/**
 * 페이지 단위 블로그 조회를 위한 커스텀 훅 (페이지네이션 지원)
 * @param page  페이지 번호 (0부터 시작)
 * @param size  페이지 크기
 */
interface BlogPageQuery {
  page: number;
  size: number;
}

// 페이지 정보 인터페이스
interface BlogPageInfo {
  // 기본 페이지 정보
  currentPage: number;
  totalPages: number;
  totalElements: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageSize: number;
  numberOfElements: number;
  
  // PageableMeta 정보
  pageable: PageableMeta;
  
  // SortMeta 정보
  sort: SortMeta;
  
  // 추가 플래그
  isFirst: boolean;
  isLast: boolean;
  isEmpty: boolean;
}

export const useBlogPage = ({ page, size }: BlogPageQuery) => {
  const [data, setData] = useState<BlogPage | null>(null);
  const [pageInfo, setPageInfo] = useState<BlogPageInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBlogPage = async () => {
      setLoading(true);
      try {
        const response = await getBlogPageList(page, size);
        if (response) {
          setData(response);
          
          // PageableMeta와 SortMeta를 포함한 완전한 페이지 정보 추출
          setPageInfo({
            // 기본 페이지 정보
            currentPage: response.number,
            totalPages: response.totalPages,
            totalElements: response.totalElements,
            hasNextPage: !response.last,
            hasPreviousPage: !response.first,
            pageSize: response.size,
            numberOfElements: response.numberOfElements,
            
            // PageableMeta 정보
            pageable: response.pageable,
            
            // SortMeta 정보
            sort: response.sort,
            
            // 추가 플래그
            isFirst: response.first,
            isLast: response.last,
            isEmpty: response.empty
          });
        }
      } catch (err) {
        setError(handleApiError(err));
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPage();
  }, [page, size]);

  return { data, pageInfo, loading, error };
};