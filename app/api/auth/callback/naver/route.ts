import { createClient } from '@/utils/supabase/server';
import { SupabaseClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const FIXED_PASSWORD = process.env.NAVER_PROVIDER_LOGIN_SECRET;

async function getBuddy(supabase: SupabaseClient, id: string) {
  const { data: buddy, error: userError } = await supabase
    .from('buddies')
    .select('*')
    .eq('buddy_id', id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  return buddy;
}

export async function POST(request: Request) {
  const { accessToken } = await request.json();
  // const { origin } = new URL(request.url);

  if (!FIXED_PASSWORD) {
    return NextResponse.json({ error: 'NAVER_PROVIDER_LOGIN_SECRET is not set' }, { status: 400 });
  }

  if (!accessToken) {
    return NextResponse.json({ error: 'Access token not found' }, { status: 400 });
  }

  try {
    // 네이버 API를 사용하여 사용자 정보 가져오기
    const response = await fetch('https://openapi.naver.com/v1/nid/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch user info from Naver' }, { status: 400 });
    }

    const userData = await response.json();
    const userEmail = userData.response.email;

    const supabase = createClient();

    // signInWithPassword로 로그인 시도
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: userEmail,
      password: FIXED_PASSWORD,
    });

    if (signInError) {
      if (signInError.message.includes('Invalid login credentials')) {
        // 사용자 존재하지 않음, 새로 가입 시도
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: userEmail,
          password: FIXED_PASSWORD,
          options: {
            data: {
              avatar_url: userData.response.profile_image,
            },
          },
        });

        if (signUpError) {
          throw signUpError;
        }

        if (!signUpData.user) {
          return NextResponse.json({ error: 'User not found' }, { status: 401 });
        }

        const buddy = await getBuddy(supabase, signUpData.user.id);

        return NextResponse.json(buddy, { status: 200 });
      } else {
        throw signInError;
      }
    } else {
      // console.log('네이버로그인시도중 로그인 성공시 ====>', signInData);

      const buddy = await getBuddy(supabase, signInData.user.id);
      // 로그인 성공
      return NextResponse.json(buddy, { status: 200 });
    }
  } catch (error) {
    console.error('Error during Naver login callback:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
