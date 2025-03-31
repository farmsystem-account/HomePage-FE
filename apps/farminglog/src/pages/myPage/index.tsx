import useMediaQueries from '@/hooks/useMediaQueries';
import WebView from './WebView/WebView.tsx';
import AppView from './AppView/AppView.tsx';

export default function Main() {
  const { isApp } = useMediaQueries();

  return (
    <>
      {isApp ? <AppView /> : <WebView />}
    </>
  );
}
