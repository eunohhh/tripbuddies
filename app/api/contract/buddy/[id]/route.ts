import { Contract } from '@/types/Contract.types';
import { Trip } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;
  const supabase = createClient();

  const {
    data: contractsData,
    error: contractsError,
  }: { data: Contract[] | null; error: PostgrestError | null } = await supabase
    .from('contract')
    .select('*')
    .eq('contract_buddy_id', id);

  if (contractsError) {
    console.error('컨트랙트 오류 발생:', contractsError);
    return NextResponse.json({ error: contractsError?.message }, { status: 500 });
  }

  if (!contractsData) {
    return NextResponse.json({ error: '컨트랙트 데이터가 없습니다.' }, { status: 404 });
  }

  const contractTripIds = contractsData.map((contract) => contract.contract_trip_id);

  const {
    data: tripData,
    error: tripError,
  }: { data: Trip[] | null; error: PostgrestError | null } = await supabase
    .from('trips')
    .select('*')
    .in('trip_id', contractTripIds)
    .order('trip_start_date', { ascending: false });
  // .limit(1)
  // .single();

  if (tripError) {
    console.error('여정 가져오기 오류 발생:', tripError);
    return NextResponse.json({ error: tripError?.message }, { status: 500 });
  }

  if (!tripData) {
    return NextResponse.json({ error: '여정 데이터가 없습니다.' }, { status: 404 });
  }

  return NextResponse.json({ contracts: contractsData, trips: tripData }, { status: 200 });
}
