
export const convertRoleToString = (role: string): string => {
    const RoleMap: Record<string, string> = {
      USER: '사용자',
      ADMIN: '관리자',
    };
  
    return RoleMap[role] || role; 
  };
  