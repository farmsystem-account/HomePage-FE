import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApi } from "../../../api/hooks/usePrivateApi";
import { useUserStore } from "../../stores/userStore";
import { User, UpdateUserRequest } from "../../models/user"; 

export const useUpdateUserMutation = () => {
  const { patch } = useApi();
  const queryClient = useQueryClient();
  const { setUser } = useUserStore();

  return useMutation<User, Error, UpdateUserRequest>({
    mutationFn: async (body) => {
      const { data, status } = await patch<User>("/user/mypage", body);
      if (status !== 200) throw new Error("사용자 정보 수정 실패");
      return data;
    },
    onSuccess: (updatedUser) => {
      setUser(updatedUser); 
      queryClient.invalidateQueries({ queryKey: ["user", "me"] }); 
    },
    onError: () => {
      alert("사용자 정보 수정에 실패했습니다.");
    },
  });
};
