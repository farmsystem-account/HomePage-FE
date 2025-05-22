import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import * as S from './index.styles';

import BlogList from './Blog/BlogList';
import ProjectList from './Project/ProjectList';
import useMediaQueries from '@/hooks/useMediaQueries';

const Blog: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'blog' | 'project'>('project');
  const { isTablet, isMobile } = useMediaQueries();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // URL에 따라 탭 설정
    if (location.pathname === '/blog') {
      setActiveTab('blog');
    } else if (location.pathname === '/project') {
      setActiveTab('project');
    }
  }, [location.pathname]);

  const handleTabChange = (tab: 'blog' | 'project') => {
    setActiveTab(tab);
    navigate(tab === 'blog' ? '/blog' : '/project');
  };

  return (
    <>
    <S.Container>
      <S.ButtonWrapper $isMobile={isMobile} $isTablet={isTablet}>
        <S.ButtonContainer>
          <S.ToggleButton 
            active={activeTab === 'project'} 
            onClick={() => handleTabChange('project')} 
            $isMobile={isMobile}
          >
            <div>프로젝트</div>
          </S.ToggleButton>
          <S.Divider $isMobile={isMobile}>|</S.Divider>
          <S.ToggleButton 
            active={activeTab === 'blog'} 
            onClick={() => handleTabChange('blog')} 
            $isMobile={isMobile}
          >
            <div>블로그</div>
          </S.ToggleButton>
        </S.ButtonContainer>
      </S.ButtonWrapper>
        {activeTab === 'project' && (
          <S.ActiveTabIndicator $isTablet={isTablet} $isMobile={isMobile}>
            <ProjectList />
          </S.ActiveTabIndicator>
        )}
        {activeTab === 'blog' && (
          <S.ActiveTabIndicator $isTablet={isTablet} $isMobile={isMobile}>
            <BlogList />
          </S.ActiveTabIndicator>
        )}
    </S.Container>
    </>
  );
};

export default Blog;
