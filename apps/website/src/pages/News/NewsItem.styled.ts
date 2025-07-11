import styled from 'styled-components';

interface MobileProps {
  $isMobile?: boolean;
  $isTablet?: boolean;
  $isDesktop?: boolean;
}

export const NewsItem = styled.button<MobileProps>`
  display: flex;
  flex-direction: ${({ $isMobile, $isTablet }) => ($isMobile ? 'column' : $isTablet ? 'row' : 'row')};
  padding: ${({ $isMobile }) => ($isMobile ? '10px 15px' : '20px 30px')};
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '15px' : '30px')};

  border-radius: 10px;
  background: #F1F1F1;
  cursor: pointer;
  max-width: 1000px;
  width: 100%;
`;

export const Thumbnail = styled.img<MobileProps>`
  width: ${({ $isMobile }) => ($isMobile ? 'auto' : '311px')};
  height: ${({ $isMobile }) => ($isMobile ? 'auto' : '200px')};
  flex-shrink: 0;
  aspect-ratio: ${({ $isMobile }) => ($isMobile ? '16/9' : '311/200')};
  border-radius: 10px;
  // 피그마상 직선인거 아무거나 넣음
  object-fit: cover;
  object-position: center;
`;

export const NewsContent = styled.div<MobileProps>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  padding: 10px 0;
  gap: ${({ $isMobile }) => ($isMobile ? '10px' : '20px')};
  flex: 1 0 0;
  align-self: stretch;
`;

export const Title = styled.h2<MobileProps>`
  width: 100%;
  height: auto;
  align-self: stretch;
  text-align: start;

  color: var(--FarmSystem_Black, #191919);
  font-size: ${({ $isMobile }) => ($isMobile ? '18px' : '24px')};
  font-style: normal;
  font-weight: 700;
  line-height: ${({ $isMobile }) => ($isMobile ? '22px' : '30px')};
  letter-spacing: -0.24px;
`;

export const Content = styled.p<MobileProps>`
  width: 100%;
  height: ${({ $isMobile }) => ($isMobile ? 'auto' : '65px')};
  flex-shrink: 0;
  text-align: start;

  color: var(--FarmSystem_Black, #191919);
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ $isMobile }) => ($isMobile ? '18px' : '20px')};
  letter-spacing: -0.24px;

  /* 3줄까지만 표시, 그 이상은 ... 처리 */
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DateAndTagBox = styled.div<MobileProps>`
  display: flex;
  align-items: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'center')};
  justify-content: ${({ $isMobile }) => ($isMobile ? 'flex-start' : 'space-between')};
  width: 100%;
  flex-direction: ${({ $isMobile }) => ($isMobile ? 'column' : 'row')};
`;

export const Date = styled.p<MobileProps>`
  color: var(--FarmSystem_Black, #191919);
  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: 30px; /* 187.5% */
  letter-spacing: -0.24px;
`;

export const TagBox = styled.div<MobileProps>`
  display: flex;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '5px' : '10px')};
  align-self: stretch;
`;

export const Tag = styled.div<MobileProps>`
  display: flex;
  height: ${({ $isMobile }) => ($isMobile ? '25px' : '30px')};
  padding: ${({ $isMobile }) => ($isMobile ? '3px 10px' : '5px 15px')};
  justify-content: center;
  align-items: center;
  gap: ${({ $isMobile }) => ($isMobile ? '5px' : '10px')};
  
  border-radius: 15px;
  background: var(--FarmSystem_Green06, #006811);
  color: var(--FarmSystem_White, #FCFCFC);
  text-align: center;

  font-size: ${({ $isMobile }) => ($isMobile ? '14px' : '16px')};
  font-style: normal;
  font-weight: 400;
  line-height: ${({ $isMobile }) => ($isMobile ? '16px' : '20px')};
  letter-spacing: -0.24px;
`;
