import { useState, useEffect } from 'react';
import { handleApiError } from '@/utils/handleApiError';
import { getFilteredProjects, getProjectById } from '@/services/project';
import { Project, ProjectFilterResponse, ProjectFilterApiResponse } from '@/models/project';
import { Track } from '@/models/blog';

/** 필터링된 프로젝트 목록 불러오기 */
export const useProjectList = (
  generation?: number,
  track?: Track,
  page: number = 0,
  size: number = 10
) => {
  const [data, setData] = useState<Project[]>([]);
  const [pageInfo, setPageInfo] = useState<ProjectFilterResponse['pageInfo'] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const response: ProjectFilterApiResponse = await getFilteredProjects(generation, track, page, size);
        if (response.data) {
          setData(response.data.content);
          setPageInfo(response.data.pageInfo);
        }
      } catch (err) {
        const errorObj = handleApiError(err);
        setError(errorObj);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [generation, track, page, size]);

  return { data, pageInfo, loading, error };
};

/** 프로젝트 상세 불러오기 */
export const useProjectDetail = (projectId: number) => {
  const [data, setData] = useState<Project | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjectDetail = async () => {
      setLoading(true);
      try {
        const response = await getProjectById(projectId);
        setData(response);
      } catch (err) {
        const errorObj = handleApiError(err);
        setError(errorObj);
      } finally {
        setLoading(false);
      }
    };

    fetchProjectDetail();
  }, [projectId]);

  return { data, loading, error };
};