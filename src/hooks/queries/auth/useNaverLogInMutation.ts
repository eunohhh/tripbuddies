import { postNaverLogIn } from '@/api-services/auth/client';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy } from '@/types/Auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useNaverLogInMutation() {
  const queryClient = useQueryClient();

  return useMutation<Buddy | null, Error, void>({
    mutationFn: () => postNaverLogIn(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
    },
  });
}
