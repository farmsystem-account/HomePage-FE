export enum FarmingLogCategory {
  SEMINAR = '세미나',
  PROJECT = '프로젝트',
  STUDY = '스터디',
  HACKATHON = '해커톤',
  REVIEW = '후기',
  LECTURE = '강연',
  ETC = '기타',
}

export const FarmingLogCategoryLabel: Record<FarmingLogCategory, string> = {
  [FarmingLogCategory.SEMINAR]: '세미나',
  [FarmingLogCategory.PROJECT]: '프로젝트',
  [FarmingLogCategory.STUDY]: '스터디',
  [FarmingLogCategory.HACKATHON]: '해커톤',
  [FarmingLogCategory.REVIEW]: '후기',
  [FarmingLogCategory.LECTURE]: '강연',
  [FarmingLogCategory.ETC]: '기타',
};


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