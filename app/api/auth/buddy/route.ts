import { Buddy, PartialBuddy } from '@/types/Auth.types';
import convertToWebP from '@/utils/common/convertToWebp';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
// import { revalidatePath, revalidateTag } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// 클라이언트에서 요청할 때
export async function GET() {
  const supabase = createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (error.message === 'Auth session missing!')
      return NextResponse.json(
        { buddy: null, error: 'Auth session missing!' },
        { status: 200 }, // 여기가 문제 200을 리턴해야 에러가 안나긴 하는데...
      );

    if (error.message === 'Unauthorized')
      return NextResponse.json(
        { buddy: null, error: '인증되지 않은 사용자입니다.' },
        { status: 401 },
      );
    return NextResponse.json({ buddy: null, error: error?.message }, { status: 401 });
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
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  // revalidateTag('buddy');
  // revalidatePath('/', 'layout');

  return NextResponse.json(buddy, { status: 200 });
}

// 서버에서 요청할 때
export async function POST(req: NextRequest) {
  const { userId } = await req.json();
  const supabase = createClient();
  const { data: buddy, error: userError } = await supabase
    .from('buddies')
    .select('*')
    .eq('buddy_id', userId)
    .single();

  // console.log('buddy =====>', buddy);
  // console.log('userError =====>', userError);
  if (userError) {
    console.error(userError);
    return NextResponse.json({ error: userError?.message }, { status: 401 });
  }

  return NextResponse.json(buddy, { status: 200 });
}

// 클라이언트에서 업데이트 요청할 때
export const PATCH = async (req: NextRequest) => {
  let finalBuddy: Buddy | null = null;
  const formData = await req.formData();
  const file = formData.get('imageFile') as Blob;
  const buddyInfo: PartialBuddy = JSON.parse(formData.get('buddyInfo') as string);
  const supabase = createClient();

  if (!buddyInfo) {
    return NextResponse.json({ error: 'Buddy info not found' }, { status: 404 });
  }

  if (file && buddyInfo) {
    const imageBuffer = await convertToWebP(file, 320);

    if (!imageBuffer) {
      return NextResponse.json({ error: 'Image conversion failed' }, { status: 401 });
    }
    const filePath = `profile/profile_${Date.now()}.webp`;

    const { error } = await supabase.storage
      .from('buddies')
      .upload(filePath, imageBuffer, { contentType: 'image/webp' });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error?.message }, { status: 401 });
    }
    const { data: publicUrlData } = await supabase.storage.from('buddies').getPublicUrl(filePath);

    buddyInfo.buddy_profile_pic = publicUrlData.publicUrl;

    const {
      data: buddy,
      error: updateError,
    }: { data: Buddy | null; error: PostgrestError | null } = await supabase
      .from('buddies')
      .update([{ ...buddyInfo }])
      .eq('buddy_id', buddyInfo.buddy_id)
      .select()
      .single();

    if (updateError) {
      if (updateError.message.includes('duplicate')) {
        return NextResponse.json({ error: '이미 존재하는 닉네임입니다.' }, { status: 401 });
      }
      return NextResponse.json({ error: updateError?.message }, { status: 401 });
    }

    if (!buddy) {
      return NextResponse.json({ error: 'Buddy not found' }, { status: 404 });
    }
    finalBuddy = buddy;
  }

  if (!file && buddyInfo) {
    const { data: buddy, error }: { data: Buddy | null; error: PostgrestError | null } =
      await supabase
        .from('buddies')
        .update([{ ...buddyInfo }])
        .eq('buddy_id', buddyInfo.buddy_id)
        .select()
        .single();

    if (error) {
      if (error.message.includes('duplicate')) {
        return NextResponse.json({ error: '이미 존재하는 닉네임입니다.' }, { status: 401 });
      }
      return NextResponse.json({ error: error?.message }, { status: 401 });
    }

    if (!buddy) {
      return NextResponse.json({ error: 'Buddy not found' }, { status: 404 });
    }
    finalBuddy = buddy;
  }

  if (!finalBuddy) return NextResponse.json({ error: 'Buddy not found' }, { status: 404 });

  // revalidateTag('buddy');
  // revalidatePath('/', 'layout');

  return NextResponse.json(finalBuddy, { status: 200 });
};
