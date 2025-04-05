/**
 * 응원하기, 파밍로그, 랭킹, 마이페이지 등 페이지들의 흰색 콘텐츠 영역을 담당하는 컴포넌트
 */

import React from 'react';
import { useNavigate } from 'react-router';
import useMediaQueries from '@/hooks/useMediaQueries';
import * as S from './WhiteContentContainer.styled';
import GoBackImage from '@/assets/Icons/corner-up-left.png';

interface WhiteContentContainerProps {
  title?: string;                  // 페이지 제목
  isContentHeaderShown?: boolean; // 콘텐츠 헤더 표시 여부
  children: React.ReactNode;
};

export default function WhiteContentContainer({
  title = '',
  isContentHeaderShown = true,
  children
}: WhiteContentContainerProps) {
  const navigate = useNavigate();
  const { isApp, isMobile, isTablet, isDesktop } = useMediaQueries();
  
  return (
    <S.MainContainer
      $isApp={isApp}
      $isMobile={isMobile}
      $isTablet={isTablet}
      $isDesktop={isDesktop}
    >
      <S.ContentContainer
        $isApp={isApp}
        $isMobile={isMobile}
        $isTablet={isTablet}
        $isDesktop={isDesktop}
      >
        { isContentHeaderShown && (
          <S.ContentContainerHeader
            $isApp={isApp}
            $isMobile={isMobile}
            $isTablet={isTablet}
            $isDesktop={isDesktop}
          >
            <S.GoBackButton
              $isApp={isApp}
              $isMobile={isMobile}
              $isTablet={isTablet}
              $isDesktop={isDesktop}
              onClick={() => navigate(-1)}
            >
              <img src={GoBackImage} alt="뒤로가기" />
            </S.GoBackButton>
            <S.ContentContainerTitle
              $isApp={isApp}
              $isMobile={isMobile}
              $isTablet={isTablet}
              $isDesktop={isDesktop}
            >
              {title}
            </S.ContentContainerTitle>
          </S.ContentContainerHeader>
        )}
        {children}
      </S.ContentContainer>
    </S.MainContainer>
  );
}