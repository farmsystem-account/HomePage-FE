import { useParams } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import { getTrackName } from './ProjectItem';
import * as S from './ProjectDetail.styles';
import { useEffect, useState } from 'react';
import { DetailedProjectResponse, ProjectResponse } from '@/models/project';
import { getProjectById } from '@/services/project';
import DetailLayout from '@/layouts/DetailLayout/DetailLayout';
import Logger from '@/utils/Logger';

const ProjectDetail: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const { isMobile, isTablet, isDesktop } = useMediaQueries();
  const [project, setProject] = useState<DetailedProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!projectId) return;
        const response = await getProjectById(parseInt(projectId));
        console.log('Fetched Project Data:', response);
        
        if (response.data) {
          const projectData = response.data;
          console.log('Project ID:', projectData.projectId);
          console.log('Title:', projectData.title);
          console.log('Introduction:', projectData.introduction);
          console.log('Content:', projectData.content);
          console.log('Thumbnail:', projectData.thumbnailImageUrl);
          console.log('Body Image:', projectData.bodyImageUrl);
          console.log('Track:', projectData.track);
          console.log('Participants:', projectData.participants);
          console.log('Links:', {
            github: projectData.githubLink,
            deployment: projectData.deploymentLink,
            resource: projectData.resourceLink
          });
          setProject(projectData);
        }
      } catch (err) {
        console.error('Error fetching project:', err);
        setError(err instanceof Error ? err : new Error('프로젝트를 불러오는데 실패했습니다.'));
        Logger.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <S.Container $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        로딩 중...
      </S.Container>
    );
  }

  if (error || !project) {
    return (
      <S.Container $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        에러가 발생했습니다: {error?.message}
      </S.Container>
    );
  }

  return (
    <S.Container $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
      <S.ProjectPageTitle $isMobile={isMobile} $isTablet={isTablet} $isDesktop={isDesktop}>
        프로젝트
      </S.ProjectPageTitle>
      <DetailLayout
        title={project.title}
        content={`${project.introduction}\n\n${project.content}`}
        tag={getTrackName(project.track)}
        thumbnailUrl={project.thumbnailImageUrl}
        imageUrls={project.bodyImageUrl ? [project.bodyImageUrl] : []}
      />
    </S.Container>
  );
};

export default ProjectDetail; 