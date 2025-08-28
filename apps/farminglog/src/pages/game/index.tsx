import React, { useState } from 'react'; // useState를 import 합니다.
import { UnityWebGL } from '../../components/UnityWebGL';
import { GameContainer, GameTitle, GameDescription, StartButton, StartContainer } from './index.styled.ts';

const Game: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true); 
  };

  return (
    <GameContainer>
      <GameTitle>🌱 Farming Game</GameTitle>
      <GameDescription>
        농장을 관리하고 작물을 키워보세요! 
        Unity로 제작된 WebGL 게임을 통해 농업의 즐거움을 경험할 수 있습니다.
      </GameDescription>
      
      {/** isGameStarted 값에 따라 조건부로 렌더링. */}
      {isGameStarted ? (
        <UnityWebGL 
          width="100%"
          height="1000px"
        />
      ) : (
        <StartContainer>
          <StartButton onClick={handleStartGame}>
            게임 시작하기
          </StartButton>
        </StartContainer>
      )}
    </GameContainer>
  );
};

export default Game;