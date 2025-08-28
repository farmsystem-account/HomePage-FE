import React from 'react';
import { UnityWebGL } from '../../components/UnityWebGL';
import { GameContainer, GameTitle, GameDescription } from './index.styled.ts';

const Game: React.FC = () => {
  return (
    <GameContainer>
      <GameTitle>🌱 Farming Game</GameTitle>
      <GameDescription>
        농장을 관리하고 작물을 키워보세요! 
        Unity로 제작된 WebGL 게임을 통해 농업의 즐거움을 경험할 수 있습니다.
      </GameDescription>
      
      <UnityWebGL 
        width="100%"
        height="100%"
      />
    </GameContainer>
  );
};

export default Game;