// authService.ts

import { OAuthResponse } from "@supabase/supabase-js";
import {
  Buddy,
  ErrorResponse,
  LogInData,
  PartialBuddy,
} from "@/types/Auth.types";
import { Follow } from "@/types/Follow.types";
import fetchWrapper from "@/utils/api/fetchWrapper";

// 서버쪽 fetch 함수들은 분리할 것

export async function postLogIn(payload: LogInData): Promise<Buddy> {
  const url = `/api/auth/login`;
  const data = await fetchWrapper<Buddy>(url, {
    method: "POST",
    body: JSON.stringify(payload),
    next: { tags: ["buddy"] },
  });
  return data;
}

export async function deleteLogOut(): Promise<void> {
  const url = `/api/auth/logout`;
  await fetchWrapper<void>(url, {
    method: "DELETE",
    next: { tags: ["buddy"] },
  });
}

export async function postSignUp(payload: LogInData): Promise<Buddy> {
  const url = `/api/auth/signup`;
  const data = await fetchWrapper<Buddy>(url, {
    method: "POST",
    body: JSON.stringify(payload),
    next: { tags: ["buddy"] },
  });
  return data;
}

export async function getLogInWithProvider(
  provider: string,
): Promise<OAuthResponse["data"]> {
  const url = `/api/auth/provider?provider=${provider}`;
  const data = await fetchWrapper<OAuthResponse["data"]>(url, {
    method: "GET",
    next: { tags: ["buddy"] },
  });
  return data;
}

export async function patchBuddyInfo({
  buddyInfo,
  imageFile,
}: {
  buddyInfo: PartialBuddy | null;
  imageFile: File | null;
}): Promise<Buddy> {
  const url = `/api/auth/buddy`;
  const formData = new FormData();

  if (imageFile) formData.append("imageFile", imageFile);
  if (buddyInfo) formData.append("buddyInfo", JSON.stringify(buddyInfo));

  const data = await fetchWrapper<Buddy>(url, {
    method: "PATCH",
    body: formData,
    next: { tags: ["buddy"] },
  });
  return data;
}

export async function getBuddyClient(): Promise<Buddy | null> {
  const url = `/api/auth/buddy`;
  try {
    const data = await fetchWrapper<Buddy | ErrorResponse>(url, {
      method: "GET",
      next: { tags: ["buddy"] },
    });
    if ("error" in data) {
      if (data.error === "Auth session missing!") {
        return null;
      }
      return null;
    }
    return data as Buddy;
  } catch (error: any) {
    if (error.message === "Auth session missing!") {
      return null; // 에러를 throw 하지 않고 null 반환하는 것이 올바른 방법인지 확인해보기
    }
    throw error;
  }
}

export async function postSendingResetEmail(email: string): Promise<void> {
  const url = "/api/auth/recover-redirect";
  await fetchWrapper<void>(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email }),
  });
}

export async function patchResetPassword(password: string): Promise<Buddy> {
  const url = "/api/auth/recover";
  const data = await fetchWrapper<Buddy>(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
  });
  return data;
}

export async function postNaverLogIn(
  accessToken: string,
): Promise<{ redirectUrl: string; buddy: Buddy } | null> {
  const url = "/api/auth/callback/naver";
  const data = await fetchWrapper<{ redirectUrl: string; buddy: Buddy } | null>(
    url,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { tags: ["buddy"] },
    },
  );
  return data;
}

export async function getSpecificBuddy(id: string): Promise<Buddy> {
  const url = `/api/auth/buddy/${id}`;
  const data = await fetchWrapper<Buddy>(url, {
    method: "GET",
  });
  return data;
}

export async function getRecommendBuddies(): Promise<{
  buddies: Buddy[];
  isPending: boolean;
}> {
  const url = `/api/buddyProfile/buddiesRecommendationList`;
  const data = await fetchWrapper<{
    buddies: Buddy[];
    isPending: boolean;
  }>(url, {
    method: "GET",
  });
  return data;
}

export async function fetchFollowData(
  clickedBuddyId: string,
): Promise<Follow[]> {
  const url = `/api/buddyProfile/follow/followList?current_buddy_id=${clickedBuddyId}`;
  const data = await fetchWrapper<{
    originFollow: Follow[];
    message: string;
  }>(url, { method: "GET" });

  return data.originFollow;
}

export async function updateBuddyTemperature(buddyId: string): Promise<number> {
  if (!buddyId) {
    throw new Error("유효한 버디 아이디가 없습니다.");
  }

  try {
    const data = await fetchWrapper<{
      buddy_temperature: number;
    }>("/api/buddyProfile/temperature", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentBuddyId: buddyId,
      }),
    });

    return data.buddy_temperature;
  } catch (error) {
    console.error("버디즈 지수 증가 중 오류:", error);
    throw error;
  }
}
