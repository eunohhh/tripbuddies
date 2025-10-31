import { SupabaseClient } from "@supabase/supabase-js";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Buddy } from "@/types/Auth.types";
import { createClient } from "@/utils/supabase/server";
import { createAdminClient } from "@/utils/supabase/server-admin";

const FIXED_PASSWORD = process.env.NAVER_PROVIDER_LOGIN_SECRET;
const ONE_HOUR_MS = 60 * 60 * 1000;

/**
 * buddy_id로 buddies 테이블에서 사용자 정보를 가져옵니다.
 */
async function getBuddy(
  supabase: SupabaseClient,
  id: string,
): Promise<Buddy | null> {
  const { data: buddy, error } = await supabase
    .from("buddies")
    .select("*")
    .eq("buddy_id", id)
    .single();

  if (error) {
    console.error("Error fetching buddy by id:", error);
    return null;
  }

  return buddy;
}

/**
 * 이메일로 buddies 테이블에서 사용자 정보를 가져옵니다.
 */
async function getBuddyByEmail(
  supabase: SupabaseClient,
  email: string,
): Promise<Buddy | null> {
  const { data: buddy, error } = await supabase
    .from("buddies")
    .select("*")
    .eq("buddy_email", email)
    .single();

  if (error) {
    // 에러가 있지만 사용자가 존재하지 않는 경우는 null 반환 (정상적인 경우)
    return null;
  }

  return buddy;
}

/**
 * 이메일로 auth.users에서 사용자를 찾습니다.
 */
async function findUserByEmail(supabaseAdmin: SupabaseClient, email: string) {
  const { data: users } = await supabaseAdmin.auth.admin.listUsers();
  return users?.users.find((user) => user.email === email) ?? null;
}

/**
 * 최초 로그인 여부를 확인합니다 (1시간 이내 생성된 사용자).
 */
function isNewUser(createdAt: string): boolean {
  return new Date(createdAt).getTime() > Date.now() - ONE_HOUR_MS;
}

/**
 * 리다이렉트 URL을 생성합니다.
 */
function getRedirectUrl(
  origin: string,
  forwardedHost: string | null,
  isLocalEnv: boolean,
  path: string,
): string {
  if (isLocalEnv) {
    return `${origin}${path}`;
  }
  if (forwardedHost) {
    return `https://${forwardedHost}${path}`;
  }
  return `${origin}${path}`;
}

/**
 * 사용자 로그인 처리를 수행합니다 (세션 생성).
 */
async function signInUser(
  email: string,
  password: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Error signing in user:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error) {
    console.error("Error during sign in:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

/**
 * 기존 사용자 처리를 수행합니다.
 * 필요한 경우 여기서 auth.users 대신
 * public의 커스텀 유저 테이블을 사용할 수 있습니다.
 */
async function handleExistingUser(
  buddy: Buddy,
  userEmail: string,
  password: string,
  origin: string,
  forwardedHost: string | null,
  isLocalEnv: boolean,
  next: string,
): Promise<NextResponse> {
  // 기존 사용자도 로그인 처리 필요
  const signInResult = await signInUser(userEmail, password);
  if (!signInResult.success) {
    console.error("Failed to sign in existing user:", signInResult.error);
    return NextResponse.json(
      { error: "Failed to sign in user" },
      { status: 500 },
    );
  }

  const newUser = isNewUser(buddy.buddy_created_at);

  // 최초 로그인이면 온보딩으로 리다이렉트
  if (newUser) {
    const redirectUrl = `${origin}/onboarding?funnel=0&mode=first`;
    return NextResponse.json({ redirectUrl, buddy }, { status: 200 });
  }

  // 기존 사용자는 x-forwarded-host가 있으면 그것을 사용하고, 없으면 origin을 사용하여 리다이렉트
  const redirectUrl = getRedirectUrl(origin, forwardedHost, isLocalEnv, next);
  return NextResponse.json({ redirectUrl, buddy }, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
  const isLocalEnv = process.env.NODE_ENV === "development";
  const next = searchParams.get("next") ?? "/";
  const headersList = await headers();
  const accessToken = headersList.get("Authorization")?.split(" ")[1];

  if (!FIXED_PASSWORD) {
    return NextResponse.json(
      { error: "NAVER_PROVIDER_LOGIN_SECRET is not set" },
      { status: 400 },
    );
  }

  if (!accessToken) {
    return NextResponse.json(
      { error: "Access token not found" },
      { status: 400 },
    );
  }

  try {
    // 네이버 API를 사용하여 사용자 정보 가져오기
    const response = await fetch("https://openapi.naver.com/v1/nid/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch user info from Naver" },
        { status: 400 },
      );
    }

    const userData = await response.json();
    const userEmail: string = userData.response?.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not found in Naver user data" },
        { status: 400 },
      );
    }

    const supabaseAdmin = createAdminClient();

    // 먼저 buddies 테이블에서 이메일로 기존 사용자 확인
    // buddies 테이블의 buddy_email unique constraint 위반을 방지하기 위함
    const existingBuddy = await getBuddyByEmail(supabaseAdmin, userEmail);

    // 기존 사용자가 있는 경우
    if (existingBuddy) {
      const existingUser = await findUserByEmail(supabaseAdmin, userEmail);

      // 커스텀 테이블에는 있는데, auth.users에서 찾을 수 없는 경우 - 그러니까 망한 상황임
      // 이런 상황이 발생하면 커스텀 테이블과 auth.users 간의 데이터 일관성이 깨진 것임
      // 그냥 이럴땐 커스텀 테이블에 있는 유저 지우고 다시 하던지 하면 될 듯
      if (!existingUser) {
        console.error("Buddy exists but auth user not found");
        return NextResponse.json(
          { error: "Auth user not found for existing buddy" },
          { status: 500 },
        );
      }

      return handleExistingUser(
        existingBuddy,
        userEmail,
        FIXED_PASSWORD,
        origin,
        forwardedHost,
        isLocalEnv,
        next,
      );
    }

    // 새 사용자 생성
    const { data: user, error } = await supabaseAdmin.auth.admin.createUser({
      email: userEmail,
      password: FIXED_PASSWORD,
      email_confirm: true, // 네이버 OAuth 사용자는 이메일이 이미 확인된 상태
      app_metadata: {
        provider: "naver",
        providers: ["naver"],
      },
      user_metadata: {
        iss: "https://nid.naver.com",
        sub: userData.response.id,
        name: userData.response.name,
        email: userEmail,
        picture: userData.response.profile_image,
        full_name: userData.response.name,
        avatar_url: userData.response.profile_image,
        provider_id: userData.response.id,
        email_verified: true,
        phone_verified: false,
      },
    });

    // auth.users에 이미 존재하는 경우 (buddies는 없지만 auth.users는 있는 경우)
    if (error?.message.includes("A user with this email already exists")) {
      const existingUser = await findUserByEmail(supabaseAdmin, userEmail);

      // 이미 auth.users 에 존재해서 에러가 발생한 상황인데
      // email 로는 못찾는 상황임
      // 엄청 이상한 상황이므로 에러 메시지 수정.. 해서 쓰든지 추가 보완 필요
      if (!existingUser) {
        console.error("odd situation: user exists but could not be found");
        return NextResponse.json(
          { error: "odd situation: user exists but could not be found" },
          { status: 500 },
        );
      }

      const buddy = await getBuddy(supabaseAdmin, existingUser.id);

      if (!buddy) {
        console.error("Buddy not found for existing user");
        return NextResponse.json(
          { error: "Buddy profile not found" },
          { status: 404 },
        );
      }

      return handleExistingUser(
        buddy,
        userEmail,
        FIXED_PASSWORD,
        origin,
        forwardedHost,
        isLocalEnv,
        next,
      );
    }

    // 사용자 생성 에러 처리
    if (error) {
      console.error("Error creating user:", error);
      return NextResponse.json({ error: error?.message }, { status: 400 });
    }

    // 사용자 생성 실패 시
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 새로 생성된 사용자 로그인 처리 (세션 생성)
    const signInResult = await signInUser(userEmail, FIXED_PASSWORD);
    if (!signInResult.success) {
      console.error("Failed to sign in new user:", signInResult.error);
      return NextResponse.json(
        { error: "User created but failed to sign in" },
        { status: 500 },
      );
    }
    const buddy = await getBuddy(supabaseAdmin, user.user.id);
    if (!buddy) {
      console.error("Buddy not found for new user");
      return NextResponse.json(
        { error: "Buddy profile not found" },
        { status: 404 },
      );
    }

    // 최초 로그인 여부 확인 (생성된 사용자는 항상 새 사용자)
    const redirectUrl = getRedirectUrl(origin, forwardedHost, isLocalEnv, next);
    return NextResponse.json({ redirectUrl, buddy }, { status: 200 });
  } catch (error) {
    console.error("Error during Naver login callback ====>", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
