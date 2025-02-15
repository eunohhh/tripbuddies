import { PartialBuddy } from '@/types/Auth.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const followingId = searchParams.get('followingId');
  const followerId = searchParams.get('followerId');

  if (!followingId || !followerId) {
    return NextResponse.json(
      { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
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
      .eq('follow_following_id', followingId)
      .eq('follow_follower_id', followerId);

    if (error) {
      return NextResponse.json(
        { message: '팔로잉 중복 여부 검사가 되지 않았습니다.' },
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
      { message: '팔로잉 중복 여부 검사가 되지 않았습니다.' },
      {
        status: 500,
      },
    );
  }
}

export async function POST(req: NextRequest) {
  const { followingId, followerId } = await req.json();

  if (!followingId || !followerId) {
    return NextResponse.json(
      { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
      {
        status: 400,
      },
    );
  }

  if (followingId === followerId) {
    return NextResponse.json(
      { message: '자기 자신은 팔로우 할 수 없습니다.' },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();

  try {
    const { data: follow, error } = await supabase.from('follow').insert({
      follow_following_id: followingId,
      follow_follower_id: followerId,
    });

    if (error) {
      return NextResponse.json(
        { follow: null, error: error.message || '알 수 없는 오류' },
        { status: 500 },
      );
    }

    const {
      data: buddy,
      error: buddyError,
    }: { data: PartialBuddy | null; error: PostgrestError | null } = await supabase
      .from('buddies')
      .select('*')
      .eq('buddy_id', followerId)
      .single();

    if (buddyError) {
      return NextResponse.json({ error: buddyError.message }, { status: 401 });
    }

    const {
      data: notification,
      error: notificationError,
    }: { data: Notification | null; error: PostgrestError | null } = await supabase
      .from('notifications')
      .insert([
        {
          notification_type: 'follow',
          notification_sender: buddy?.buddy_id,
          notification_receiver: followingId,
          notification_origin_id: followingId,
          notification_content: `${buddy?.buddy_nickname}님이 팔로우 하셨습니다.`,
        },
      ])
      .select()
      .single();

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }

    return NextResponse.json({ follow }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: '팔로잉이 이루어지지 않았습니다.' },
      {
        status: 500,
      },
    );
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const followingId = searchParams.get('followingId');
  const followerId = searchParams.get('followerId');

  if (!followingId || !followerId) {
    return NextResponse.json(
      { message: '팔로잉 또는 팔로워 id가 조회되지 않았습니다.' },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();

  try {
    const { data: follow, error } = await supabase
      .from('follow')
      .delete()
      .eq('follow_following_id', followingId)
      .eq('follow_follower_id', followerId);

    if (error) {
      return NextResponse.json(
        { follow: null, error: error.message || '알 수 없는 오류' },
        { status: 500 },
      );
    }

    const {
      data: notification,
      error: notificationError,
    }: { data: Notification | null; error: PostgrestError | null } = await supabase
      .from('notifications')
      .delete()
      .eq('notification_sender', followerId)
      .eq('notification_receiver', followingId)
      .eq('notification_origin_id', followingId)
      .eq('notification_type', 'follow');

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json(
      { message: '팔로잉이 취소되지 않았습니다.' },
      {
        status: 500,
      },
    );
  }
}
