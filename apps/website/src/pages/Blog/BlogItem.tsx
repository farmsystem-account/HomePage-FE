import * as S from './BlogItem.styles';

export interface BlogItemProps {
  title: string;
  description: string;
  imageUrl: string;
  blogUrl: string;
}

const ProjectItem: React.FC<BlogItemProps> = ({ title, description, imageUrl, blogUrl}) => {
  return (
    <S.Card href={blogUrl} target="_blank">
      <S.Image><img src={imageUrl} alt={title}></img></S.Image>
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          <S.Tag>해커톤</S.Tag>
        </S.TagContainer>
      </S.Content>
    </S.Card>
  );
};

export default ProjectItem;
