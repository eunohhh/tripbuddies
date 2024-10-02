import { postLogIn } from '@/api-services/auth/client';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { Buddy, LogInData } from '@/types/Auth.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useLogInMutation() {
  const queryClient = useQueryClient();
  return useMutation<Buddy | null, Error, LogInData>({
    mutationFn: (data: LogInData) => postLogIn(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
    },
  });
}
