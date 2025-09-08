import React, { useState } from 'react'; // useState를 import 합니다.
import { UnityWebGL } from '../../components/UnityWebGL';
import { GameContainer, GameTitle, StartButton, StartContainer } from './index.styled.ts';

const Game: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStartGame = () => {
    setIsGameStarted(true); 
  };

  return (
    <GameContainer>
      <GameTitle>🌱 Grow My Farm</GameTitle>
      
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