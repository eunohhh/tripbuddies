// authService.ts
import { Buddy, ErrorResponse, LogInData, PartialBuddy } from '@/types/Auth.types';
import { Follow } from '@/types/Follow.types';
import fetchWrapper from '@/utils/api/fetchWrapper';
import { OAuthResponse } from '@supabase/supabase-js';

// 서버쪽 fetch 함수들은 분리할 것

export async function postLogIn(payload: LogInData): Promise<Buddy> {
  const url = `/api/auth/login`;
  try {
    const data = await fetchWrapper<Buddy>(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      next: { tags: ['buddy'] },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function deleteLogOut(): Promise<void> {
  const url = `/api/auth/logout`;
  try {
    await fetchWrapper<void>(url, {
      method: 'DELETE',
      next: { tags: ['buddy'] },
    });
  } catch (error: any) {
    throw error;
  }
}

export async function postSignUp(payload: LogInData): Promise<Buddy> {
  const url = `/api/auth/signup`;
  try {
    const data = await fetchWrapper<Buddy>(url, {
      method: 'POST',
      body: JSON.stringify(payload),
      next: { tags: ['buddy'] },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getLogInWithProvider(provider: string): Promise<OAuthResponse['data']> {
  const url = `/api/auth/provider?provider=${provider}`;
  try {
    const data = await fetchWrapper<OAuthResponse['data']>(url, {
      method: 'GET',
      next: { tags: ['buddy'] },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function patchBuddyInfo({
  buddyInfo,
  imageFile,
}: {
  buddyInfo: PartialBuddy | null;
  imageFile: File | null;
}): Promise<Buddy> {
  const url = `/api/auth/buddy`;
  try {
    const formData = new FormData();

    if (imageFile) formData.append('imageFile', imageFile);
    if (buddyInfo) formData.append('buddyInfo', JSON.stringify(buddyInfo));

    const data = await fetchWrapper<Buddy>(url, {
      method: 'PATCH',
      body: formData,
      next: { tags: ['buddy'] },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getBuddyClient(): Promise<Buddy | null> {
  const url = `/api/auth/buddy`;
  try {
    const data = await fetchWrapper<Buddy | ErrorResponse>(url, {
      method: 'GET',
      next: { tags: ['buddy'] },
    });
    if ('error' in data) {
      if (data.error === 'Auth session missing!') {
        return null;
      }
      return null;
    }
    return data as Buddy;
  } catch (error: any) {
    if (error.message === 'Auth session missing!') {
      return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
    }
    throw error;
  }
}

export async function postSendingResetEmail(email: string): Promise<void> {
  const url = '/api/auth/recover-redirect';
  try {
    await fetchWrapper<void>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
  } catch (error: any) {
    throw error;
  }
}

export async function patchResetPassword(password: string): Promise<Buddy> {
  const url = '/api/auth/recover';
  try {
    const data = await fetchWrapper<Buddy>(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function postNaverLogIn(): Promise<Buddy | null> {
  if (!window.location.hash) return null;
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');

  const url = '/api/auth/callback/naver';
  try {
    const data = await fetchWrapper<Buddy>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ accessToken }),
      next: { tags: ['buddy'] },
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getSpecificBuddy(id: string): Promise<Buddy> {
  const url = `/api/auth/buddy/${id}`;
  try {
    const data = await fetchWrapper<Buddy>(url, {
      method: 'GET',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function getRecommendBuddies(): Promise<{
  buddies: Buddy[];
  isPending: boolean;
}> {
  const url = `/api/buddyProfile/buddiesRecommendationList`;
  try {
    const data = await fetchWrapper<{
      buddies: Buddy[];
      isPending: boolean;
    }>(url, {
      method: 'GET',
    });
    return data;
  } catch (error: any) {
    throw error;
  }
}

export async function fetchFollowData(clickedBuddyId: string): Promise<Follow[]> {
  const url = `/api/buddyProfile/follow/followList?current_buddy_id=${clickedBuddyId}`;
  try {
    const data = await fetchWrapper<{
      originFollow: Follow[];
      message: string;
    }>(url, { method: 'GET' });

    return data.originFollow;
  } catch (error) {
    throw error;
  }
}

export async function updateBuddyTemperature(buddyId: string): Promise<number> {
  if (!buddyId) {
    throw new Error('유효한 버디 아이디가 없습니다.');
  }

  try {
    const data = await fetchWrapper<{
      buddy_temperature: number;
    }>('/api/buddyProfile/temperature', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        currentBuddyId: buddyId,
      }),
    });

    return data.buddy_temperature;
  } catch (error) {
    console.error('버디즈 지수 증가 중 오류:', error);
    throw error;
  }
}
