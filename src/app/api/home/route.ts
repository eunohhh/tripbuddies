import { Buddy } from '@/types/Auth.types';
import { StoryWithBuddies } from '@/types/Story.types';
import { TripWithContract } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const supabase = createClient();
  const mode = req.nextUrl.searchParams.get('mode');

  try {
    // buddies 테이블에서 buddy_temperature가 가장 높은 10명 가져오기
    if (mode === 'buddies') {
      const {
        data: buddies,
        error: buddiesError,
      }: { data: Buddy[] | null; error: PostgrestError | null } = await supabase
        .from('buddies')
        .select('*')
        .order('buddy_temperature', { ascending: false })
        .limit(10);

      // 데이터베이스 에러 처리
      if (buddiesError) {
        console.error('버디 추천 리스트 통신 오류 발생:', buddiesError);
        return NextResponse.json({ buddies: null, error: buddiesError?.message }, { status: 404 });
      }
      if (!buddies) {
        return NextResponse.json({ error: 'Buddies not found' }, { status: 404 });
      }
      return NextResponse.json({ buddies }, { status: 200 });
    } else if (mode === 'stories') {
      const {
        data: stories,
        error: storyError,
      }: {
        data: StoryWithBuddies[] | null;
        error: PostgrestError | null;
      } = await supabase
        .from('stories')
        .select(
          '*, buddies:story_created_by (*), likes:storylikes!storylikes_storylikes_story_id_foreign (*)',
        )
        .order('story_created_at', { ascending: false });

      if (storyError) {
        console.error(storyError);
        return NextResponse.json({ error: storyError?.message }, { status: 404 });
      }

      if (!stories) {
        return NextResponse.json({ error: 'Stories not found' }, { status: 404 });
      }

      return NextResponse.json({ stories }, { status: 200 });
    } else if (mode === 'trips') {
      const {
        data: trips,
        error: tripsError,
      }: {
        data: TripWithContract[] | null;
        error: PostgrestError | null;
      } = await supabase
        .from('trips')
        .select(
          // '*, contract:contract!contract_contract_trip_id_foreign (*)',
          '*, contract (*)',
        )
        .order('trip_created_at', { ascending: false });

      if (tripsError) {
        console.error(tripsError);
        return NextResponse.json({ error: tripsError?.message }, { status: 404 });
      }

      if (!trips) {
        return NextResponse.json({ error: 'Trips not found' }, { status: 404 });
      }

      return NextResponse.json({ trips }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid mode' }, { status: 404 });
  } catch (error) {
    console.error(error);
  }
}
