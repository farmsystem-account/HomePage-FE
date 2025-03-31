import { useMutation,  useQueryClient  } from '@tanstack/react-query';
import { usePrivateApi } from '@repo/api/hooks/usePrivateApi';
import { FarmingLog, FarmingLogsResponse } from '@/models/farminglog';
import type { InfiniteData } from '@tanstack/react-query';

// 좋아요 토글 API
export const useToggleLikeMutation = () => {
  const { post } = usePrivateApi();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (farmingLogId: number) => {
      await post(`/farming-logs/${farmingLogId}/like`);
    },
    onSuccess: (_, farmingLogId) => {
      console.log('좋아요 토글 성공!');

      queryClient.setQueryData(
        ['farminglog'], 
        (oldData?: InfiniteData<FarmingLogsResponse>) => {
          if (!oldData) return oldData;

          // oldData.pages: FarmingLogsResponse[]
          // 각 page에 content: FarmingLog[] 가 있을 것으로 가정
          const newPages = oldData.pages.map((page) => {
            // page: FarmingLogsResponse

            // 좋아요 토글할 항목만 업데이트
            const newContent = page.content.map((item: FarmingLog) => {
              if (item.farmingLogId === farmingLogId) {
                // 토글 로직
                const isLiked = !item.isLiked;
                const likeCount = isLiked
                  ? item.likeCount + 1
                  : item.likeCount - 1;

                return {
                  ...item,
                  isLiked,
                  likeCount,
                };
              }
              return item;
            });

            return {
              ...page,
              content: newContent,
            };
          });

          // 새로운 pages로 재할당
          return {
            ...oldData,
            pages: newPages,
          };
        }
      );
    },
    onError: (error) => {
      console.error('좋아요 토글 실패:', error);
    },
  });
};
