import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const supabase = createClient();

    try {
        const { tripId, userId } = await req.json();

        // trip 데이터를 가져오기 위해 Supabase에서 trips 테이블을 조회
        const { data: trip, error: tripError } = await supabase
            .from('trips')
            .select('*')
            .eq('trip_id', tripId)
            .maybeSingle();

        if (tripError) {
            console.error('여행 데이터를 가져오는 중 오류 발생:', tripError);
            return NextResponse.json(
                { error: '여행 데이터를 가져오는 중 오류 발생' },
                { status: 500 },
            );
        }

        if (!trip) {
            return NextResponse.json(
                { error: '여행을 찾을 수 없습니다' },
                { status: 404 },
            );
        }

        // 지금 입력하려는 contract_trip_id와 userId가 있는지 확인
        const { data: existingContracts, error: existingContractsError } =
            await supabase
                .from('contract')
                .select('*')
                .eq('contract_trip_id', tripId)
                .eq('contract_buddy_id', userId);

        if (existingContractsError) {
            console.error(
                '기존 contract 조회 중 오류 발생:',
                existingContractsError,
            );
            return NextResponse.json(
                { error: '기존 contract 조회 중 오류 발생' },
                { status: 500 },
            );
        }

        if (existingContracts && existingContracts.length > 0) {
            const isLeader = existingContracts.some(
                contract => contract.contract_isLeader,
            );
            if (isLeader) {
                return NextResponse.json(
                    { error: '자신의 여정에는 참여를 신청할 수 없습니다' },
                    { status: 400 },
                );
            }
            return NextResponse.json(
                { error: '해당 여정에는 이미 참여하셨습니다.' },
                { status: 400 },
            );
        }

        // 현재 여정의 contract가 생성된 수를 확인
        const { count: contractCount, error: contractCountError } =
            await supabase
                .from('contract')
                .select('*', { count: 'exact' })
                .eq('contract_trip_id', tripId);

        if (contractCountError) {
            console.error('contract 수 확인 중 오류 발생:', contractCountError);
            return NextResponse.json(
                { error: 'contract 수 확인 중 오류 발생' },
                { status: 500 },
            );
        }

        if (
            contractCount !== null &&
            contractCount >= trip.trip_max_buddies_counts
        ) {
            return NextResponse.json(
                { error: '해당 여정은 인원이 가득 찼습니다.' },
                { status: 400 },
            );
        }

        const today = new Date();
        const tripEndDate = new Date(trip.trip_end_date);
        const isValidate = today <= tripEndDate;

        const contractData = {
            contract_trip_id: tripId,
            contract_buddy_id: userId,
            contract_start_date: trip.trip_start_date,
            contract_end_date: trip.trip_end_date,
            contract_isLeader: false,
            contract_isPending: true,
            contract_isValidate: isValidate,
            contract_created_at: new Date().toISOString(),
        };

        // 'contract' 테이블에 contract 데이터를 삽입
        const { data: contract, error: contractError } = await supabase
            .from('contract')
            .insert(contractData)
            .select();

        if (contractError) {
            console.error('컨트랙트 생성 중 오류 발생:', contractError);
            return NextResponse.json(
                { contract: null, error: contractError?.message },
                { status: 500 },
            );
        }

        return NextResponse.json({ contract: contract[0] }, { status: 200 });
    } catch (error) {
        console.error('요청 처리 중 오류 발생:', error);
        return NextResponse.json(
            { trip: null, contract: null, error: '서버 오류' },
            { status: 500 },
        );
    }
}
