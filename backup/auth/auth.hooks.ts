'use client';

import { patchBuddyInfo } from './patchBuddyInfo';
import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { AuthContext } from '@/contexts/auth.context';
import {
    type Buddy,
    type LogInData,
    type PartialBuddy,
} from '@/types/Auth.types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext } from 'react';
import { getBuddyClient } from './getBuddyClient';
import { postSignUp } from './postSignUp';
import { postLogIn } from './postLogIn';

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (context === undefined || context === null) {
        throw new Error('오류 발생! 오류발생! 훅은 프로바이더 안에서 써줘요잉');
    }

    return context;
};

// 서버쪽 쿼리는 작성 금지

export function useBuddyQuery() {
    return useQuery<Buddy | null, Error>({
        queryKey: [QUERY_KEY_BUDDY],
        queryFn: () => getBuddyClient(),
    });
}

export function useUpdateBuddyInfoMutation() {
    const queryClient = useQueryClient();
    return useMutation<void, Error, PartialBuddy>({
        mutationFn: (buddyInfo: PartialBuddy) => patchBuddyInfo(buddyInfo),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}

export function useLogInMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy | null, Error, LogInData>({
        mutationFn: (data: LogInData) => postLogIn(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}

export function useSignUpMutation() {
    const queryClient = useQueryClient();
    return useMutation<Buddy | null, Error, LogInData>({
        mutationFn: (data: LogInData) => postSignUp(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [QUERY_KEY_BUDDY] });
        },
    });
}
