import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // console.log("callback 에서 받은 request =>", request);
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll();
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options),
              );
            } catch {}
          },
        },
      },
    );
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error && data?.session?.user) {
      const user = data.session.user;

      // 예시 1: 최초 로그인 여부 확인 (created_at이 최근인지 확인)
      const isNewUser = new Date(user.created_at).getTime() > Date.now() - 60 * 60 * 1000; // 1시간 이내에 생성된 사용자

      console.log('isNewUser =====>', isNewUser);

      if (isNewUser) {
        return NextResponse.redirect(`${origin}/onboarding?funnel=0&mode=first`);
      }

      // 로그인 성공 후 일반적인 리다이렉트 처리
      return NextResponse.redirect(`${origin}${next}`);
    }
    return NextResponse.redirect(`${origin}${next}`);
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// 만일 소셜 로그인인데, 이메일이 같으면(깃헙로그인이든 구글이든) 수파베이스 auth 에는 그냥 업데이트만 됨
// get(name: string) {
//     return cookieStore.get(name)?.value;
// },
// set(name: string, value: string, options: CookieOptions) {
//     cookieStore.set({ name, value, ...options });
// },
// remove(name: string, options: CookieOptions) {
//     cookieStore.delete({ name, ...options });
// },
