import { PartialBuddy } from '@/types/Auth.types';
import { BookMark, BookMarkRequest, Trip } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const bookmark_buddy_id = req.nextUrl.searchParams.get('bookmark_buddy_id');
  const bookmark_trip_id = req.nextUrl.searchParams.get('bookmark_trip_id');

  const {
    data: bookmarks,
    error: bookmarksError,
  }: { data: BookMark | null; error: PostgrestError | null } = await supabase
    .from('tripbookmarks')
    .select('*')
    .eq('bookmark_buddy_id', bookmark_buddy_id)
    .eq('bookmark_trip_id', bookmark_trip_id)
    .maybeSingle();

  if (bookmarksError) {
    console.error('북마크 조회 중 오류 발생:', bookmarksError);
    return NextResponse.json({ error: '북마크 조회 중 오류 발생' }, { status: 500 });
  }

  if (!bookmarks) {
    return NextResponse.json(null, { status: 200 });
  }

  return NextResponse.json(bookmarks, { status: 200 });
}

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const { bookmark_buddy_id, bookmark_trip_id, is_bookmarked }: BookMarkRequest = await req.json();

  // console.log('isbookmarked', is_bookmarked);
  // trip 데이터를 가져오기 위해 Supabase에서 trips 테이블을 조회
  const { data: trip, error: tripError }: { data: Trip | null; error: PostgrestError | null } =
    await supabase.from('trips').select('*').eq('trip_id', bookmark_trip_id).maybeSingle();

  if (tripError) {
    return NextResponse.json({ error: '여행 데이터를 가져오는 중 오류 발생' }, { status: 500 });
  }

  if (!trip) {
    return NextResponse.json({ error: '여행을 찾을 수 없습니다' }, { status: 404 });
  }

  let bookmarkResponse;

  if (is_bookmarked) {
    bookmarkResponse = await supabase
      .from('tripbookmarks')
      .delete()
      .eq('bookmark_trip_id', bookmark_trip_id)
      .eq('bookmark_buddy_id', bookmark_buddy_id);

    const {
      data: notification,
      error: notificationError,
    }: { data: Notification | null; error: PostgrestError | null } = await supabase
      .from('notifications')
      .delete()
      .eq('notification_sender', bookmark_buddy_id)
      .eq('notification_receiver', trip?.trip_master_id)
      .eq('notification_type', 'bookmark')
      .eq('notification_origin_id', bookmark_trip_id);

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }
  } else {
    bookmarkResponse = await supabase
      .from('tripbookmarks')
      .insert({
        bookmark_buddy_id: bookmark_buddy_id,
        bookmark_trip_id: bookmark_trip_id,
      })
      .select()
      .single();

    const {
      data: buddy,
      error: buddyError,
    }: { data: PartialBuddy | null; error: PostgrestError | null } = await supabase
      .from('buddies')
      .select('buddy_nickname')
      .eq('buddy_id', bookmark_buddy_id)
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
          notification_type: 'bookmark',
          notification_sender: bookmark_buddy_id,
          notification_receiver: trip?.trip_master_id,
          notification_content: `${buddy?.buddy_nickname}님이 여행을 찜하셨습니다.`,
          notification_origin_id: bookmark_trip_id,
        },
      ])
      .select()
      .single();

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }
  }

  const {
    data: bookmark,
    error: bookmarkError,
  }: {
    data: BookMark | null;
    error: PostgrestError | null;
  } = bookmarkResponse;

  if (bookmarkError) {
    console.error('컨트랙트 생성 중 오류 발생:', bookmarkError);
    return NextResponse.json({ error: bookmarkError?.message }, { status: 500 });
  }

  if (!bookmark) {
    return NextResponse.json(
      {
        bookmark_buddy_id: bookmark_buddy_id,
        bookmark_trip_id: bookmark_trip_id,
      },
      { status: 200 },
    );
  }

  return NextResponse.json(bookmark, { status: 200 });
}
