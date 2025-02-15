import { PartialBookMark } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const bookmark_buddy_id = req.nextUrl.searchParams.get('bookmark_buddy_id');

  if (!bookmark_buddy_id) {
    return NextResponse.json(
      {
        error: '찜하기 목록을 조회하려는 버디의 아이디가 조회되지 않았습니다.',
      },
      { status: 400 },
    );
  }

  const {
    data: bookmarks,
    error: bookmarksError,
  }: { data: PartialBookMark[] | null; error: PostgrestError | null } = await supabase
    .from('tripbookmarks')
    .select('bookmark_trip_id')
    .eq('bookmark_buddy_id', bookmark_buddy_id);

  if (bookmarksError) {
    console.error('북마크 조회 중 오류 발생:', bookmarksError);
    return NextResponse.json({ error: '북마크 조회 중 오류 발생' }, { status: 500 });
  }

  if (!bookmarks) {
    return NextResponse.json(null, { status: 200 });
  }

  const bookmark_trip_ids = bookmarks.map((b) => b.bookmark_trip_id);

  const { data: myBookmarkedTrips, error: myBookmarkedTripsError } = await supabase
    .from('trips')
    .select('*, contract (*)')
    .in('trip_id', bookmark_trip_ids);

  if (myBookmarkedTripsError) {
    console.error('여정 조회 중 오류 발생:', myBookmarkedTripsError);
    return NextResponse.json({ error: '여정 조회 중 오류 발생' }, { status: 500 });
  }

  return NextResponse.json(myBookmarkedTrips, { status: 200 });
}
