import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postSignUp } from "@/api-services/auth/client";
import { QUERY_KEY_BUDDY } from "@/constants/query.constants";
import { Buddy, LogInData } from "@/types/Auth.types";

export function useSignUpMutation() {
  const queryClient = useQueryClient();
  return useMutation<Buddy | null, Error, LogInData>({
    mutationFn: (data: LogInData) => postSignUp(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
    },
  });
}
