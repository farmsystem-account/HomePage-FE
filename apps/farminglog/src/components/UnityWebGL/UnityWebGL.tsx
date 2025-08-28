import React, { useEffect, useRef, useState } from 'react';
import { UnityContainer, UnityWrapper } from './UnityWebGL.styled';

interface UnityWebGLProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

const UnityWebGL: React.FC<UnityWebGLProps> = ({
  width = '100%',
  height = '600px',
  className
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // 타임아웃 설정 (30초)
    const timeoutId = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
        setHasError(true);
      }
    }, 30000);

    const handleLoad = () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
      setHasError(false);
    };

    const handleError = () => {
      clearTimeout(timeoutId);
      setIsLoading(false);
      setHasError(true);
    };

    iframe.addEventListener('load', handleLoad);
    iframe.addEventListener('error', handleError);

    return () => {
      clearTimeout(timeoutId);
      iframe.removeEventListener('load', handleLoad);
      iframe.removeEventListener('error', handleError);
    };
  }, [isLoading]);

  if (hasError) {
    return (
      <UnityContainer className={className}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center', 
          justifyContent: 'center', 
          height: height,
          backgroundColor: '#f8f9fa',
          border: '1px solid #e9ecef',
          borderRadius: '12px',
          color: '#6c757d',
          padding: '20px',
          textAlign: 'center'
        }}>
          <h3>Unity WebGL 게임을 로드할 수 없습니다</h3>
          <p>가능한 해결 방법:</p>
          <ul style={{ textAlign: 'left', margin: '10px 0' }}>
            <li>브라우저를 새로고침해보세요</li>
            <li>WebGL을 지원하는 브라우저를 사용하세요 (Chrome, Firefox, Safari)</li>
            <li>개발자 도구 콘솔에서 에러 메시지를 확인하세요</li>
          </ul>
          <button 
            onClick={() => window.location.reload()} 
            style={{
              padding: '10px 20px',
              backgroundColor: '#2d5016',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            페이지 새로고침
          </button>
        </div>
      </UnityContainer>
    );
  }

  return (
    <UnityContainer className={className}>
      {isLoading && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: '1px solid #e9ecef'
        }}>
          <p style={{ margin: 0, color: '#495057' }}>Unity 게임 로딩 중...</p>
        </div>
      )}
      <UnityWrapper
        ref={iframeRef}
        src="/WebGLBuild/BuildTest/index.html"
        width={width}
        height={height}
        frameBorder="0"
        title="Unity WebGL Game"
        allow="fullscreen; autoplay; microphone; camera"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-presentation"
        style={{ 
          border: 'none',
          borderRadius: '12px',
          opacity: isLoading ? 0.3 : 1,
          transition: 'opacity 0.3s ease'
        }}
      />
    
    </UnityContainer>
  );
};

export default UnityWebGL;