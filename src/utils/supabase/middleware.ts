import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  // 아래 requestHeaders set 관련 로직이, 서버컴포넌트에서 시작하자마자 주소를 알수있게 하는 로직임
  // 헤더에 현재 경로 추가
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', request.nextUrl.pathname);

  // 특정 쿼리 파라미터 가져오기
  const funnelParam = request.nextUrl.searchParams.get('funnel');
  if (funnelParam) requestHeaders.set('x-funnel', funnelParam);

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // IMPORTANT: Avoid writing any logic between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // console.log(user);

  // 아래 방식 아니면 동작안함
  // 아래 목록은 튕기지 않는 목록임
  if (
    !user &&
    request.nextUrl.pathname !== '/' &&
    request.nextUrl.pathname !== '/login' &&
    request.nextUrl.pathname !== '/signup' &&
    request.nextUrl.pathname !== '/recover' &&
    request.nextUrl.pathname !== '/search' &&
    request.nextUrl.pathname !== '/search/location' &&
    request.nextUrl.pathname !== '/search/date' &&
    request.nextUrl.pathname !== '/loading' &&
    request.nextUrl.pathname !== '/tutorial' &&
    !request.nextUrl.pathname.startsWith('/api') &&
    !request.nextUrl.pathname.startsWith('/stories') &&
    !request.nextUrl.pathname.startsWith('/trips') &&
    !request.nextUrl.pathname.startsWith('/profile')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (user) {
    requestHeaders.set('x-user', user.id);

    // 새로운 응답 객체 생성
    supabaseResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    if (
      (request.nextUrl.pathname.startsWith('/login') && user) ||
      (request.nextUrl.pathname.startsWith('/signup') && user)
    ) {
      const url = request.nextUrl.clone();
      url.pathname = '/';
      return NextResponse.redirect(url);
    }
  }
  // 튜토리얼 페이지 체크를 위한 쿠키 확인
  const hasVisitedTutorial = request.cookies.get('hasVisitedTutorial');

  // console.log('hasVisitedTutorial =====>', hasVisitedTutorial);
  // 튜토리얼 페이지로 리디렉션
  if (
    !hasVisitedTutorial &&
    !request.nextUrl.pathname.startsWith('/tutorial') &&
    !request.nextUrl.pathname.startsWith('/api')
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/tutorial';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

//  // 완전 일치 경로 목록, 아래랑 완전히 일치하는 경우에는 로그인으로 안튕김
//  const exactPaths = [
//     '/',
//     '/login',
//     '/recover',
//     '/search',
//     '/signup',
//     '/stories',
//     '/trips',
//     '/loading',
//     '/tutorial',
// ];

// // 접두사 일치 경로 목록, 아래로 시작하는 경우에는 로그인으로 안튕김
// const prefixPaths = ['/api'];

// // 현재 경로가 완전 일치 경로 목록에 포함되지 않고, 접두사 일치 경로 목록에도 포함되지 않는 경우
// if (
//     !user &&
//     !exactPaths.includes(request.nextUrl.pathname) &&
//     !prefixPaths.some(path => request.nextUrl.pathname.startsWith(path))
// ) {
//     const url = request.nextUrl.clone();
//     url.pathname = '/login';
//     return NextResponse.redirect(url);
// }

// IMPORTANT: You *must* return the supabaseResponse object as it is. If you're
// creating a new response object with NextResponse.next() make sure to:
// 1. Pass the request in it, like so:
//    const myNewResponse = NextResponse.next({ request })
// 2. Copy over the cookies, like so:
//    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
// 3. Change the myNewResponse object to fit your needs, but avoid changing
//    the cookies!
// 4. Finally:
//    return myNewResponse
// If this is not done, you may be causing the browser and server to go out
// of sync and terminate the user's session prematurely!
