import { useEffect, useState } from "react";

/**
 * 문서 전체 높이(가 임계값을 넘는지 감지하는 훅입니다
 * 기본 임계값 3000px이며, 리사이즈/레이아웃 변경에 반응
 */
export default function useTallPage(threshold: number = 3000): boolean {
  const [isTall, setIsTall] = useState<boolean>(false);

  useEffect(() => {
    const getPageHeight = () => document.documentElement.scrollHeight;

    // 동일 프레임 내 여러번 호출 방지
    let rafId: number | null = null;
    const evaluate = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        setIsTall(getPageHeight() > threshold);
      });
    };

    // 최초 1회 평가
    evaluate();

    let ro: ResizeObserver | null = null;
    let bodyRo: ResizeObserver | null = null;
    let mo: MutationObserver | null = null;

    // 레이아웃 변화에 반응함
    if (typeof ResizeObserver !== "undefined") {
      ro = new ResizeObserver(() => {
        evaluate();
      });
      ro.observe(document.documentElement);

      // body 높이 변화도 감지함
      if (document.body) {
        bodyRo = new ResizeObserver(() => {
          evaluate();
        });
        bodyRo.observe(document.body);
      }
    } else {
      // fallback 윈도우 리사이즈 시 반응함
      window.addEventListener("resize", evaluate);
    }

    // DOM 변동에 반응함
    if (typeof MutationObserver !== "undefined" && document.body) {
      mo = new MutationObserver(() => {
        evaluate();
      });
      mo.observe(document.body, {
        subtree: true,
        childList: true,
        attributes: false,
      });
    }

    // 추가 이벤트: 방향 전환 등
    window.addEventListener("orientationchange", evaluate);

    return () => {
      if (ro) ro.disconnect();
      if (bodyRo) bodyRo.disconnect();
      if (mo) mo.disconnect();
      else window.removeEventListener("resize", evaluate);
      window.removeEventListener("orientationchange", evaluate);
      if (rafId != null) cancelAnimationFrame(rafId);
    };
  }, [threshold]);

  return isTall;
}


