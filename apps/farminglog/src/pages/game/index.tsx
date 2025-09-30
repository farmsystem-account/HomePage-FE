import { useEffect, useRef, useState } from 'react'; // useState를 import 합니다.
import { UnityWebGL } from '../../components/UnityWebGL';
import useMediaQueries from "@/hooks/useMediaQueries";
import useTallPage from "@/hooks/useTallPage";
import { GameContainer, StartButton, StartContainer, LandingHero, UpButton, UpButtonImage } from './index.styled.ts';


const Game: React.FC = () => {
  const [isGameStarted, setIsGameStarted] = useState(false);
  const { isMobile } = useMediaQueries();
  const landingImage = 'https://farmsystem-bucket.s3.ap-northeast-2.amazonaws.com/game/DetailGameLanding.png';
  const upButtonImage = 'https://farmsystem-bucket.s3.ap-northeast-2.amazonaws.com/game/UpGameButton.png';
  const isTallPage = useTallPage(3000);
  const gameContainerRef = useRef<HTMLDivElement | null>(null);
  const [isGameContainerInView, setIsGameContainerInView] = useState(false);
  const handleStartGame = () => {
    setIsGameStarted(true); 
  };
  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    if (isMobile) return;
    if (!gameContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        setIsGameContainerInView(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    observer.observe(gameContainerRef.current);
    return () => observer.disconnect();
  }, [isMobile]);

  return (
    <div
      style={{ backgroundColor: '#46D77C' }}
    >
    <GameContainer ref={gameContainerRef}>

      
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

    {(!isMobile) && (
    <LandingHero
      $bgDesktop={landingImage}
      $bgMobile={landingImage}
    >
    </LandingHero>
    )}
    {(!isMobile && isTallPage && !isGameContainerInView) && (
    <UpButton onClick={handleScrollTop} title="맨 위로">
      <UpButtonImage src={upButtonImage} alt="Up Button" />
      </UpButton>)}
  
    </div>
  );
};

export default Game;