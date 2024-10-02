import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const { email, password }: { email: string; password: string } = await request.json();

  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signUp({
    email,
    password,
    // 닉네임은 자동설정이고, 온보딩시에 설정하므로 아래 옵션은 삭제
    // options: { data: { user_name: name } },
  });

  if (error) {
    return NextResponse.json({ buddy: null, error: error?.message }, { status: 401 });
  }
  if (!user) {
    return NextResponse.json({ buddy: null, error: 'User not found' }, { status: 404 });
  }

  const { data: buddy, error: userError } = await supabase
    .from('buddies')
    .select('*')
    .eq('buddy_id', user.id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ buddy: null, error: userError?.message }, { status: 401 });
  }

  return NextResponse.json(buddy, { status: 200 });
}
