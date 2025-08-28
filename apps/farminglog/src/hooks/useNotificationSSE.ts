// 실시간 알림... 미완성

import { useEffect } from 'react';
import apiConfig from '@repo/api/config/apiConfig';

export const useNotificationSSE = () => {
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const connectSSE = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) return;

        //apiConfig에서 baseURL 재사용
        const sseUrl = `${apiConfig.defaults.baseURL}notification/subscribe`;

        const response = await fetch(sseUrl, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'text/event-stream',
          },
          signal,
        });

        if (!response.body) {
          console.error('SSE 연결 실패: 응답 body가 없음');
          return;
        }

        const reader = response.body
          .pipeThrough(new TextDecoderStream())
          .getReader();

        let buffer = '';
        // eslint-disable-next-line no-constant-condition
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;

          buffer += value;

          const lines = buffer.split('\n\n');
          for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
            if (line.startsWith('data:')) {
              const json = line.replace('data:', '').trim();
              const parsed = JSON.parse(json);
              console.log('실시간 알림 수신:', parsed);
              // TODO: 상태 저장 or 알림 표시
            }
          }

          buffer = lines[lines.length - 1];
        }
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') {
          console.log('SSE 연결 중단됨');
        } else {
          console.error('SSE 연결 오류:', err);
        }
      }
    };

    connectSSE();

    return () => {
      controller.abort();
    };
  }, []);
};
