import * as S from './ProjectItem.style';

export interface ProjectItemProps {
  title: string;
  description: string;
  imageUrl: string;
}

const ProjectItem: React.FC<ProjectItemProps> = ({ title, description, imageUrl}) => {
  return (
    <S.Card>
      <S.Image><img src={imageUrl} alt={title}></img></S.Image>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          <S.Tag>4기</S.Tag>
          <S.Tag>빅데이터</S.Tag>
        </S.TagContainer>
      </S.Content>
    </S.Card>
  );
};

export default ProjectItem;
