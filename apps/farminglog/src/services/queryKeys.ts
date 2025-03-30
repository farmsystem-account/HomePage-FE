export const queryKeys = {
  user: {
    // 사용자 정보를 가져오는 쿼리 키
    me: ["user", "me"] as const,

    // 사용자 검색 쿼리 키 (동적 키)
    search: (query: string) => ["user", "search", query] as const,
    // 사용자 추천 쿼리 키 (동적 키)
    suggest: (query: string) => ['user', 'suggest', query]as const,

  },
  auth: {
    verify: (studentNumber: string) => ["auth", "verify", studentNumber] as const,
  },
};
