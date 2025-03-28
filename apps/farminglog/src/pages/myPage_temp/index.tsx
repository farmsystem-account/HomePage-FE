import useMediaQueries from '@/hooks/useMediaQueries';
import WebView from './WebView/WebView.tsx';
import AppView from './AppView/AppView.tsx';
import { useUserStore } from '@repo/auth/stores/userStore';

const DebugUser = () => {
  const user = useUserStore((s) => s.user);
  console.log('[zustand] 현재 사용자 정보:', user);
  return null;
};

export default function Main() {
  const { isApp } = useMediaQueries();

  return (
    <>
      <DebugUser /> {/* 콘솔 디버깅용 */}
      {isApp ? <AppView /> : <WebView />}
    </>
  );
}
