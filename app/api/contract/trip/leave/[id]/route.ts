import { Contract } from '@/types/Contract.types';
import { Trip } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const supabase = createClient();

  try {
    const { id: tripId } = params;
    const token = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!tripId || !token) {
      return NextResponse.json({ error: 'tripId와 토큰이 필요합니다.' }, { status: 400 });
    }

    const buddyId = token;

    const {
      data: tripData,
      error: tripError,
    }: { data: Trip | null; error: PostgrestError | null } = await supabase
      .from('trips')
      .select('*')
      .eq('trip_id', tripId)
      .single();

    if (tripError || !tripData) {
      console.error('여정 데이터 오류 발생:', tripError || '데이터 없음');
      return NextResponse.json({ error: '여정 정보를 불러오는 데 실패했습니다.' }, { status: 404 });
    }

    const {
      data: contractData,
      error: contractError,
    }: { data: Contract[] | null; error: PostgrestError | null } = await supabase
      .from('contract')
      .select('*')
      .eq('contract_trip_id', tripId);

    if (contractError || !contractData) {
      console.error('여정 참가 데이터 오류 발생:', contractError || '데이터 없음');
      return NextResponse.json(
        { error: '여정 참가 정보를 불러오는 데 실패했습니다.' },
        { status: 404 },
      );
    }

    const hasBuddyId = contractData?.some((contract) => contract.contract_buddy_id === buddyId);

    if (!hasBuddyId) {
      return NextResponse.json({ error: '해당 여정의 구성원이 아닙니다.' }, { status: 403 });
    }

    const { error: deleteContractError } = await supabase
      .from('contract')
      .delete()
      .eq('contract_trip_id', tripId)
      .eq('contract_buddy_id', buddyId);

    if (deleteContractError) {
      console.error('여정 참가 삭제 오류 발생:', deleteContractError);
      return NextResponse.json({ error: '여정에서 나가는 데 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '여정에서 나가셨습니다.' }, { status: 200 });
  } catch (err) {
    console.error('서버 내부 오류:', err);
    return NextResponse.json({ error: '서버 내부 오류가 발생했습니다.' }, { status: 500 });
  }
}
