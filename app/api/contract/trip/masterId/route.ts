import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tripId = searchParams.get('trip_id');

  if (!tripId) {
    return NextResponse.json(
      { message: '버디가 작성한 여정 정보를 찾지 못했습니다.' },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();

  try {
    const { data: trip, error } = await supabase
      .from('trips')
      .select('trip_master_id')
      .eq('trip_id', tripId)
      .single();

    if (error || !trip) {
      return NextResponse.json(
        { message: '버디가 작성한 여정 정보를 찾지 못했습니다.' },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      { trip_master_id: trip.trip_master_id },
      {
        status: 200,
      },
    );
  } catch (error) {
    return NextResponse.json(
      { message: '알 수 없는 오류' },
      {
        status: 500,
      },
    );
  }
}
