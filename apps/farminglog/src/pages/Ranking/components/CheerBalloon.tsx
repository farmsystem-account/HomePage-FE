import * as S from './CheerBalloon.styles';
import Good from '@/assets/Icons/good.png';
import Person from '@/assets/Icons/person.png';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CheerBalloonProps {
  x: number;
  y: number;
  isApp: boolean;
  onClose: () => void;
  onCheerClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onProfileClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

// forwardRef 사용!
const CheerBalloon = forwardRef<HTMLDivElement, CheerBalloonProps>(
  ({ x, y, isApp, onCheerClick, onProfileClick }, ref) => {
    return (
      <S.BalloonWrapper
        as={motion.div}
        ref={ref}
        isApp={isApp}
        isVisible={true} // or provide a dynamic value based on your logic
        style={{ top: y, left: x }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <S.Option isApp={isApp} onClick={(e) => { e.stopPropagation(); onCheerClick(e); }}>
          <S.IconImg isApp={isApp} src={Good} alt="응원하기 아이콘" />
          <S.Label isApp={isApp}>응원하기</S.Label>
        </S.Option>
        <S.Option isApp={isApp} onClick={(e) => { e.stopPropagation(); onProfileClick(e); }}>
          <S.IconImg isApp={isApp} src={Person} alt="프로필 보기 아이콘" />
          <S.Label isApp={isApp}>프로필 보기</S.Label>
        </S.Option>
      </S.BalloonWrapper>
    );
  }
);

export default CheerBalloon;
