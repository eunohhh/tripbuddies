import { Buddy } from '@/types/Auth.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  const supabase = createClient();

  try {
    const { data: buddy, error }: { data: Buddy | null; error: PostgrestError | null } =
      await supabase.from('buddies').select('*').eq('buddy_id', id).single();

    if (error) {
      console.error('버디 통신 오류 발생:', error);
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    if (!buddy) {
      return NextResponse.json({ error: '버디 없음' }, { status: 404 });
    }

    return NextResponse.json(buddy, { status: 200 });
  } catch (error) {
    console.error('버디 통신 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
