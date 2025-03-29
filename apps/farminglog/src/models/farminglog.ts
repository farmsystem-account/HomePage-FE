export enum FarmingLogCategory {
  '세미나', '프로젝트', '스터디', '해커톤', '후기', '강연'
}

export interface FarmingLog {
  farmingLogId: number,
  title: string,
  content: string,
  category: FarmingLogCategory,
  createdAt: string,
  author: string,
  profileImageUrl: string,
  track: string,
  generation: number,
  isOwner: boolean,
  isLiked: boolean,
  likeCount: number
}

export interface FarmingLogsResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  number: number;
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  },
  numberOfElements: number;
  pageable: {
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    },
    pageSize: number;
    paged: boolean;
    pageNumber: number;
    unpaged: boolean;
    offset: number;
  },
  size: number;
  content: FarmingLog[];
  empty: boolean;
}