import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request) {
  const { password } = await req.json();

  const supabase = createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    // console.log("비번변경시 에러 서버에서 =>", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const { data: buddy, error: userError } = await supabase
    .from('buddies')
    .select('*')
    .eq('buddy_id', user.id)
    .single();

  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 500 });
  }

  return NextResponse.json(buddy, { status: 200 });
}
