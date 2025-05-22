import { useState, useEffect } from 'react';
import { getProjects } from '@/api/project';

interface Project {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  grade: string;
  track: string;
  createdAt: string;
  updatedAt: string;
}

interface ProjectResponse {
  content: Project[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

interface UseProjectProps {
  grade?: string;
  track?: string;
  page: number;
  size: number;
}

export const useProject = ({ grade, track, page, size }: UseProjectProps) => {
  const [projects, setProjects] = useState<ProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await getProjects({ grade, track, page, size });
        setProjects(response);
        setError(null);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch projects'));
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [grade, track, page, size]);

  return { projects, loading, error };
}; 