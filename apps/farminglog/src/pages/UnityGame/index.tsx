import React from 'react';
import { UnityWebGL } from '../../components/UnityWebGL';
import { GameContainer, GameTitle, GameDescription } from './index.styled';

const UnityGame: React.FC = () => {
  return (
    <GameContainer>
      <GameTitle>Unity WebGL 게임</GameTitle>
      <GameDescription>
        아래에서 Unity로 제작된 WebGL 게임을 플레이할 수 있습니다.
        게임이 로드되지 않는 경우 브라우저를 새로고침해주세요.
      </GameDescription>
      
      <UnityWebGL 
        width="100%"
        height="1000px"
      />
    </GameContainer>
  );
};

export default UnityGame;
