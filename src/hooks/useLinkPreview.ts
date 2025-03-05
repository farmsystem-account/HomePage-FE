// useLinkPreview.ts
import { useState, useEffect, useRef } from 'react';
import { handleApiError } from "@/utils/handleApiError";

export interface APIResponse {
  title: string | null;
  description: string | null;
  image: string | null;
  siteName: string | null;
  hostname: string | null;
}

// const proxyLink = 

export const isValidResponse = (res: APIResponse | null): boolean => {
  if (!res) return false;
  return (
    res.title !== null &&
    res.description !== null &&
    res.image !== null &&
    res.siteName !== null &&
    res.hostname !== null &&
    res.title !== undefined &&
    res.description !== undefined &&
    res.image !== undefined &&
    res.siteName !== undefined &&
    res.hostname !== undefined &&
    res.image !== 'null' &&
    !res.image.startsWith('/')
  );
};

/**
 * useLinkPreview
 * url을 입력받아서 메타데이터를 Fetch하고 로딩 상태를 반환하는 커스텀 훅
 * 선택적으로 커스텀 fetcher를 전달할 수 있습니다.
 */
export const useLinkPreview = (
  url: string,
  fetcher?: (url: string) => Promise<APIResponse | null>
) => {
  const [metadata, setMetadata] = useState<APIResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const isMounted = useRef(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    isMounted.current = true;
    setLoading(true);

    if (fetcher) {
      fetcher(url)
        .then((res) => {
          if (isMounted.current) {
            if (isValidResponse(res)) {
              setMetadata(res);
            } 
            else {
              setMetadata(null);
            }
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(handleApiError(err));
          if (isMounted.current) {
            setMetadata(null);
            setLoading(false);
          }
        });
    } 
    else {
      fetch(url)
        .then((res) => res.json())
        .then((res) => {
          if (isMounted.current) {
            setMetadata((res.metadata as unknown) as APIResponse);
            setLoading(false);
          }
        })
        .catch((err) => {
          setError(handleApiError(err));
          if (isMounted.current) {
            setMetadata(null);
            setLoading(false);
          }
        });
    }

    return () => {
      isMounted.current = false;
    };
  }, [url, fetcher]);

  return { metadata, loading, error};
};
