import React from 'react';
import * as S from './BlogItem.styles';
import { useLinkPreview } from '@/hooks/useLinkPreview';
import BlankImg from '../../assets/Images/Blog_Project/blank_img.svg';

export enum BlogCategory {
  SEMINAR,
  PROJECT,
  STUDY,
  HACKATHON,
  REVIEW,
  LECTURE,
  ETC,
}

export interface BlogTag {
  category: BlogCategory;
}

export interface BlogItemProps {
  title: string;
  description: string;
  blogUrl: string;
  tags: BlogTag[];
}

// 카테고리 enum을 텍스트로 매핑
const getCategoryName = (category: BlogCategory): string => {
  switch (category) {
    case BlogCategory.SEMINAR:
      return '세미나';
    case BlogCategory.PROJECT:
      return '프로젝트';
    case BlogCategory.STUDY:
      return '스터디';
    case BlogCategory.HACKATHON:
      return '해커톤';
    case BlogCategory.REVIEW:
      return '리뷰';
    case BlogCategory.LECTURE:
      return '강의';
    case BlogCategory.ETC:
      return '기타';
    default:
      return '';
  }
};

const BlogItem: React.FC<BlogItemProps> = ({
  title,
  description,
  blogUrl,
  tags,
}) => {
  //blogUrl에 대한 메타데이터를 fetching
  const { metadata, loading } = useLinkPreview(blogUrl);

  // 메타데이터에서 가져온 이미지, 없으면 BlankImg
  const previewImage = metadata?.image || BlankImg;

  return (
    <S.Card href={blogUrl} target="_blank">
      {loading ? (
          <S.Image>
            <img src={previewImage} alt={title} />
          </S.Image>
      ) : (
        <S.Image>
          <img src={previewImage} alt={title} />
        </S.Image>
      )}
      <S.Content>
        <S.Title>{title}</S.Title>
        <S.Description>{description}</S.Description>
        <S.TagContainer>
          {tags.map((tag, index) => (
            <S.Tag key={index}>{getCategoryName(tag.category)}</S.Tag>
          ))}
        </S.TagContainer>
      </S.Content>
    </S.Card>
  );
};

export default BlogItem;
