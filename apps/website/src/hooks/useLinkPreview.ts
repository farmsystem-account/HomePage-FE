import { useState, useEffect, useRef } from "react";
import { handleApiError } from "@/utils/handleApiError";

export interface APIResponse {
  title: string;
  description: string;
  image: string;
  siteName?: string;
  hostname?: string;
}

/**
 * 필수 필드(title·image)가 채워져 있는지 확인
 */
export const isValidResponse = (res: APIResponse | null): boolean => {
  return !!(res && res.title && res.image);
};

/* ------------------------------------------------------------------ */
/* 환경별 API ORIGIN 결정                                             */
/* ------------------------------------------------------------------ */
/**
 * dev  : https://dev.farmsystem.kr
 * prod : https://farmsystem.kr
 * SSR  : NEXT_PUBLIC_API_ORIGIN 환경변수 우선
 */
const resolveApiOrigin = (): string => {
  if (typeof process !== "undefined" && process.env.NEXT_PUBLIC_API_ORIGIN) {
    return process.env.NEXT_PUBLIC_API_ORIGIN;
  }
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    // localhost 나 *.local → 동일 오리진 프록시 사용
    if (host === "localhost" || host.endsWith(".local")) return "";
    // dev 스테이징 도메인
    if (host.startsWith("dev.")) return "https://dev.farmsystem.kr";
  }
  // 기본: 프로덕션 도메인
  return "https://farmsystem.kr";
};

/* ------------------------------------------------------------------ */
/* useLinkPreview –  Serverless JSON 응답 전용                         */
/* ------------------------------------------------------------------ */
export const useLinkPreview = (
  url: string,
  fetcher?: (endpoint: string) => Promise<APIResponse | null>
) => {
  const [metadata, setMetadata] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    if (!url) {
      setMetadata(null);
      setLoading(false);
      return;
    }

    isMounted.current = true;
    setLoading(true);

    const apiOrigin = resolveApiOrigin();
    const base = apiOrigin ? `${apiOrigin}/api/og?url=` : "/api/og?url="; // 로컬(dev 서버)일 때 동일 오리진 프록시 사용
    const endpoint = `${base}${encodeURIComponent(url)}`;

    const doFetch = async () => {
      try {
        const res = fetcher ? await fetcher(endpoint) : await defaultFetcher(endpoint);
        if (!isMounted.current) return;
        setMetadata(res);
      } catch (err) {
        if (!isMounted.current) return;
        setError(handleApiError(err));
        setMetadata(null);
      } finally {
        if (isMounted.current) setLoading(false);
      }
    };

    doFetch();

    return () => {
      isMounted.current = false;
    };
  }, [url, fetcher]);

  return { metadata, loading, error };
};

export const fetchLinkPreview = async (url: string): Promise<APIResponse | null> => {
  const apiOrigin = resolveApiOrigin();
  const base = apiOrigin ? `${apiOrigin}/api/og?url=` : "/api/og?url=";
  const endpoint = `${base}${encodeURIComponent(url)}`;
  return defaultFetcher(endpoint);
};

/* ------------------------------------------------------------------ */
/* 기본 fetcher – serverless JSON                                      */
/* ------------------------------------------------------------------ */
const defaultFetcher = async (endpoint: string): Promise<APIResponse | null> => {
  const res = await fetch(endpoint, { credentials: "omit" });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data: APIResponse = await res.json();

  // hostname 보완(없을 경우)
  if (!data.hostname) {
    try {
      data.hostname = new URL(endpoint.split("url=")[1]).hostname;
    } catch {/* ignore */}
  }
  return data;
};
