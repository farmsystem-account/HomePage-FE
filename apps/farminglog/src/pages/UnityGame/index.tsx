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
        height="100%"
      />
      
      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p><strong>게임 조작법:</strong></p>
        <ul>
          <li>마우스: 카메라 시점 조작</li>
          <li>WASD: 캐릭터 이동</li>
          <li>스페이스바: 점프</li>
          <li>ESC: 메뉴 열기</li>
        </ul>
      </div>
    </GameContainer>
  );
};

export default UnityGame;
