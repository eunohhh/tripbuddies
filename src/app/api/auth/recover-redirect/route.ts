import { PUBLIC_URL } from '@/constants/common.constants';
import { createClient } from '@/utils/supabase/server';
// import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (!req.body) redirect('/login');

  const { email } = await req.json();

  // console.log('recover-redirect 에서 받은 이메일 =>', email);

  const supabase = createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${PUBLIC_URL}`,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });

    // console.log("recover-redirect 에서 에러 발생 =>", error);
    // redirect('/');
  }
  // revalidatePath('/recover');
  // redirect('/recover');
  return NextResponse.json({ message: 'Email sent' }, { status: 200 });
}
