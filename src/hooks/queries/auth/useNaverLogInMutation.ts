import { useMutation, useQueryClient } from "@tanstack/react-query";
import { postNaverLogIn } from "@/api-services/auth/client";
import { QUERY_KEY_BUDDY } from "@/constants/query.constants";
import { Buddy } from "@/types/Auth.types";

export function useNaverLogInMutation() {
  const queryClient = useQueryClient();

  return useMutation<
    { redirectUrl: string; buddy: Buddy } | null,
    Error,
    string
  >({
    mutationFn: (accessToken) => postNaverLogIn(accessToken),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
    },
  });
}
