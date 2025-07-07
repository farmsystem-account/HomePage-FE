import apiConfig from "@repo/api/config/apiConfig";
import { ProjectDetailResponse } from '@/models/project';
import { Track } from '@/models/blog';
// import apiConfig from "@/config/apiConfig";
import { ProjectFilterApiResponse } from '@/models/project';


/**
 * 단일 프로젝트 상세 조회
 * 엔드포인트: GET /api/home/projects/{projectId}
 */
export const getProjectById = async (projectId: number): Promise<ProjectDetailResponse> => {
  const response = await apiConfig.get(`home/projects/${projectId}`);
  return response.data;
};

/**
 * 필터링된 프로젝트 조회
 * 엔드포인트: GET /api/home/projects/filter
 */
export const getFilteredProjects = async (
  generation?: number,
  track?: Track,
  page: number = 0,
  size: number = 12
): Promise<ProjectFilterApiResponse> => {
  let queryString = '';
  if (generation) queryString += `generation=${generation}&`;
  if (track) queryString += `track=${track}&`;
  queryString += `page=${page}&size=${size}`;

  const url = `home/projects/filter?${queryString}`;
  console.log('API Request URL:', url);
  console.log('Request Parameters:', { generation, track, page, size });

  const response = await apiConfig.get(url);
  return response.data;
};