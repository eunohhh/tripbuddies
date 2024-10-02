import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currentBuddyId = searchParams.get('current_buddy_id');

  if (!currentBuddyId) {
    return NextResponse.json(
      { message: '조회하려는 버디 id가 조회되지 않았습니다.' },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();

  try {
    const { data: originFollow, error } = await supabase
      .from('follow')
      .select('*')
      .or(`follow_following_id.eq.${currentBuddyId},follow_follower_id.eq.${currentBuddyId}`);

    if (error) {
      return NextResponse.json(
        { message: '팔로잉 데이터를 불러올 수 없습니다.' },
        {
          status: 500,
        },
      );
    }

    // 명시적으로 빈 배열 반환
    if (!originFollow || originFollow.length === 0) {
      return NextResponse.json({ originFollow: [] }, { status: 200 });
    }

    return NextResponse.json({ originFollow }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: '팔로잉 데이터를 불러올 수 없습니다.' },
      {
        status: 500,
      },
    );
  }
}
