import { type EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest } from 'next/server';

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get('token_hash');
  const type = searchParams.get('type') as EmailOtpType | null;
  const next = searchParams.get('next') ?? '/';

  // console.log("토큰 해쉬 =>", token_hash);
  // console.log("타입 =>", type);
  // console.log("다음 주소 =>", next);

  if (token_hash && type) {
    const supabase = createClient();

    const { data, error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });

    if (error) {
      console.log('에러 =>', error);
      redirect('/');
    }

    if (data && !error) {
      // console.log('컨펌에서 데이터 잘 받아오는가? =>', data);
      redirect(next);
    }
  }

  // redirect the user to an error page with some instructions
  redirect('/');
}
