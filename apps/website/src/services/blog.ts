import apiConfig from "@repo/api/config/apiConfig";
// import apiConfig from "@/config/apiConfig";
import {
  BlogGETResponse,
  BlogPOSTRequest,
  BlogPOSTResponse,
  BlogPage
} from "@/models/blog";

/**
 * 블로그 목록 조회
 * 엔드포인트: GET /blogs
 */
export const getBlogList = async (): Promise<BlogGETResponse> => {
    const response = await apiConfig.get("blogs");
    return response.data;
};

/**
 * 블로그 신청
 * 엔드포인트: POST /blogs
 */
export const postBlog = async (
  data: BlogPOSTRequest
): Promise<BlogPOSTResponse> => {
    const response = await apiConfig.post("blogs", data);
    return response.data;
};

/**
 * 승인된 내 블로그 목록 조회
 * 엔드포인트: POST /blogs/approved
 */
export const getApprovedBlogList = async (): Promise<BlogPOSTResponse> => {
    const response = await apiConfig.get("blogs/approved");
    return response.data;
};

/**
 * 페이지 블로그 목록 조회
 * 엔드포인트: GET /blogs/page
 */
export const getBlogPageList = async (
  page: number,
  size: number,
): Promise<BlogPage> => {
  let queryString = '';
  // 페이지네이션 파라미터 추가
  queryString += `page=${page}&size=${size}`;

  const url = `blogs/page?${queryString}`;


  const response = await apiConfig.get<{ data: BlogPage }>(url);
  console.log(response.data.data);
  return response.data.data;
};
