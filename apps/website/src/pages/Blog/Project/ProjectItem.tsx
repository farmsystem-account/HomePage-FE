import * as S from './ProjectItem.style';
import { Track } from '@/models/blog';
import { useNavigate } from 'react-router';

// 카테고리 enum을 텍스트 매핑
export const getProjectGeneration = (generation: number): string => {
  return `${generation}기`;
};

// Track enum을 한글명으로 매핑
export const getTrackName = (track: Track): string => {
  const trackMap: Record<Track, string> = {
    [Track.UNION]: 'Union',
    [Track.BIGDATA]: '빅데이터',
    [Track.IOT_ROBOTICS]: '사물인터넷/로봇',
    [Track.AI]: '인공지능',
    [Track.SECURITY_WEB]: '보안/웹',
    [Track.GAMING_VIDEO]: '게임/영상'
  };
  return trackMap[track];
};

export interface ProjectTag {
  generation: number[];
  track: Track[]
}

export interface ProjectItemProps {
  projectId: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: ProjectTag[];
}

const ProjectItem: React.FC<ProjectItemProps> = ({ projectId, title, description, imageUrl, tags }) => {
  const navigate = useNavigate();

  return (
    <S.Card onClick={() => navigate(`/project/${projectId}`)}>
      <S.Image><img src={imageUrl} alt={title}></img></S.Image>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          {tags.map((tag, index) => (
            <>
              {tag.generation.map((gen) => (
                <S.Tag key={`gen-${index}-${gen}`}>
                  {getProjectGeneration(gen)}
                </S.Tag>
              ))}
              {tag.track.map((trackItem, tIndex) => (
                <S.Tag key={`track-${index}-${tIndex}`}>
                  {getTrackName(trackItem)}
                </S.Tag>
              ))}
            </>
          ))}
        </S.TagContainer>
      </S.Content>
    </S.Card>
  );
};

export default ProjectItem;
