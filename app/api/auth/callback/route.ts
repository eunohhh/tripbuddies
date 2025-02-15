import { QUERY_KEY_BUDDY } from '@/constants/query.constants';
import { createServerClient } from '@supabase/ssr';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // console.log("callback 에서 받은 request =>", request);
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/';

  // console.log('code =====>', code);

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

    // console.log('data =====>', data);
    // console.log('error =====>', error);

    if (!error && data?.session?.user) {
      const user = data.session.user;
      const queryClient = new QueryClient();

      // 예시 1: 최초 로그인 여부 확인 (created_at이 최근인지 확인)
      const isNewUser = new Date(user.created_at).getTime() > Date.now() - 60 * 60 * 1000; // 1시간 이내에 생성된 사용자

      console.log('isNewUser =====>', isNewUser);

      const { data: buddy, error: buddyError } = await supabase
        .from('buddies')
        .select('*')
        .eq('buddy_email', user.email)
        .single();

      queryClient.setQueryData([QUERY_KEY_BUDDY], buddy);

      if (isNewUser) {
        return NextResponse.redirect(`${origin}/onboarding?funnel=0&mode=first`);
      }

      const forwardedHost = request.headers.get('x-forwarded-host'); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development';
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}

// 만일 소셜 로그인인데, 이메일이 같으면(깃헙로그인이든 구글이든) 수파베이스 auth 에는 그냥 업데이트만 됨
