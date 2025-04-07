// CheerBalloon.tsx
import * as S from './CheerBalloon.styles';
import Good from '@/assets/Icons/good.png';
import Person from '@/assets/Icons/person.png';
import { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface CheerBalloonProps {
  x: number;
  y: number;
  /** 랭킹 아이템의 userId, userName 추가 */
  userId: number|0;
  userName: string|'';

  isApp: boolean;
  onClose: () => void;

  /** onCheerClick 시 (userId, userName)을 전달 */
  onCheerClick: (userId: number, userName: string) => void;
  onProfileClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const CheerBalloon = forwardRef<HTMLDivElement, CheerBalloonProps>(
  ({ x, y, userId, userName, isApp, onCheerClick, onProfileClick }, ref) => {
    return (
      <S.BalloonWrapper
        as={motion.div}
        ref={ref}
        isApp={isApp}
        isVisible={true}
        style={{ top: y, left: x }}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.2 }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* 응원하기 */}
        <S.Option
          isApp={isApp}
          onClick={(e) => {
            e.stopPropagation();
            // (userId, userName) 함께 전달
            onCheerClick(userId, userName);
          }}
        >
          <S.IconImg isApp={isApp} src={Good} alt="응원하기 아이콘" />
          <S.Label isApp={isApp}>응원하기</S.Label>
        </S.Option>

        {/* 프로필 보기 */}
        <S.Option
          isApp={isApp}
          onClick={(e) => {
            e.stopPropagation();
            onProfileClick(e);
          }}
        >
          <S.IconImg isApp={isApp} src={Person} alt="프로필 보기 아이콘" />
          <S.Label isApp={isApp}>프로필 보기</S.Label>
        </S.Option>
      </S.BalloonWrapper>
    );
  }
);

export default CheerBalloon;
