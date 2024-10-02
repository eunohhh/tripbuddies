import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
  const supabase = createClient();
  const { searchParams } = new URL(req.url);
  const buddyId = searchParams.get('buddy_id');

  if (!buddyId) {
    return NextResponse.json({ error: '버디 아이디가 조회되지 않았습니다.' }, { status: 400 });
  }

  const { data: buddy, error } = await supabase
    .from('buddies')
    .select('buddy_profile_pic')
    .eq('buddy_id', buddyId)
    .single();

  if (error || !buddy) {
    return NextResponse.json({ error: '버디 정보를 찾지 못했습니다.' }, { status: 404 });
  }

  const profilePicUrl = buddy.buddy_profile_pic;

  if (
    profilePicUrl ===
    'https://pedixhwyfardtsanotrp.supabase.co/storage/v1/object/public/buddies/profile/default_profile.webp'
  ) {
    return NextResponse.json({ error: '기본 프로필 사진은 삭제할 수 없습니다.' }, { status: 400 });
  }

  if (!profilePicUrl) {
    return NextResponse.json({ error: '프로필 사진이 없습니다.' }, { status: 400 });
  }

  // URL에서 호스트명 확인
  const isOwnBucket = profilePicUrl.includes('pedixhwyfardtsanotrp');

  if (!isOwnBucket) {
    // 호스트명이 일치하지 않으면 기본 프로필로 변경
    const { error: updateError } = await supabase
      .from('buddies')
      .update({
        buddy_profile_pic:
          'https://pedixhwyfardtsanotrp.supabase.co/storage/v1/object/public/buddies/profile/default_profile.webp',
      })
      .eq('buddy_id', buddyId);

    if (updateError) {
      return NextResponse.json({ error: '프로필 업데이트에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '삭제되었습니다.' }, { status: 200 });
  }

  // URL에서 파일명 추출
  const fileName = profilePicUrl.split('/').pop();

  if (!fileName) {
    return NextResponse.json({ error: '파일명을 추출하지 못했습니다.' }, { status: 400 });
  }

  // Supabase 스토리지에서 파일 삭제
  const { error: deleteError } = await supabase.storage
    .from('buddies')
    .remove([`profile/${fileName}`]);

  if (deleteError) {
    return NextResponse.json({ error: '삭제에 실패했습니다. 다시 시도해주세요.' }, { status: 500 });
  }

  // 프로필 사진을 기본 프로필로 업데이트
  const { error: updateError } = await supabase
    .from('buddies')
    .update({
      buddy_profile_pic:
        'https://pedixhwyfardtsanotrp.supabase.co/storage/v1/object/public/buddies/profile/default_profile.webp',
    })
    .eq('buddy_id', buddyId);

  if (updateError) {
    return NextResponse.json({ error: '프로필 업데이트에 실패했습니다.' }, { status: 500 });
  }

  return NextResponse.json({ message: '프로필 사진 삭제에 성공했습니다.' }, { status: 200 });
}
