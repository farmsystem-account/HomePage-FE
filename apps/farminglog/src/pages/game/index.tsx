import React, { useState } from 'react'; // useState를 import 합니다.
import { UnityWebGL } from '../../components/UnityWebGL';
import useMediaQueries from "@/hooks/useMediaQueries";
import { GameContainer, StartButton, StartContainer, LandingHero, UpButton, UpButtonImage } from './index.styled.ts';


const Game: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const [isLanding, setIsLanding] = useState(true);
  const { isMobile } = useMediaQueries();
  const landingImage = 'https://farmsystem-bucket.s3.ap-northeast-2.amazonaws.com/game/DetailGameLanding.png';
  const upButtonImage = 'https://farmsystem-bucket.s3.ap-northeast-2.amazonaws.com/game/UpGameButton.png';
  const handleStartGame = () => {
    setIsGameStarted(true); 
  };
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{ backgroundColor: '#46D77C' }}
    >
    <GameContainer>

      
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

    {!isMobile && (
    <LandingHero
      $bgDesktop={landingImage}
      $bgMobile={landingImage}
      onClick={() => setIsLanding(false)}
    >
    </LandingHero>
    )}
    {( !isMobile && isLanding &&  
    <UpButton onClick={handleScrollTop}  title="맨 위로">
      <UpButtonImage src={upButtonImage} alt="Up Button" />
      </UpButton>)}
  
    </div>
  );
};

export default Game;