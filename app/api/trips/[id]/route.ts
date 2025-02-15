import { TripWithContract } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();

  const {
    data: trip,
    error: tripError,
  }: {
    data: TripWithContract | null;
    error: PostgrestError | null;
  } = await supabase.from('trips').select('*, contract (*)').eq('trip_id', id).maybeSingle();

  if (tripError) {
    console.error(tripError);
    return NextResponse.json({ error: tripError?.message }, { status: 401 });
  }

  if (!trip) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  return NextResponse.json(trip, { status: 200 });
}
