import { ContractWithTrips } from '@/types/Contract.types';
import { TripWithContract } from '@/types/Trips.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();

  const {
    data: allTrips,
    error: allTripsError,
  }: {
    data: TripWithContract[] | null;
    error: PostgrestError | null;
  } = await supabase.from('trips').select('*, contract (*)');

  if (allTripsError) {
    console.error(allTripsError);
    return NextResponse.json({ error: allTripsError?.message }, { status: 401 });
  }

  if (!allTrips) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  const createdTrips = allTrips?.filter((trip) => trip.trip_master_id === id);

  // 참여중인 여정 (contract)
  const {
    data: contract,
    error: contractError,
  }: {
    data: ContractWithTrips[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('contract')
    .select('*, trips:contract_trip_id (*)')
    .eq('contract_buddy_id', id)
    .eq('contract_isLeader', false);

  if (contractError) {
    console.error(contractError);
    return NextResponse.json({ error: contractError?.message }, { status: 401 });
  }

  if (!contract) {
    return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
  }

  const participatedTrips =
    contract.map((contract) =>
      allTrips?.find((trip) => trip.trip_id === contract.contract_trip_id),
    ) || [];

  return NextResponse.json(
    { created: createdTrips, participated: participatedTrips },
    { status: 200 },
  );
}

// const {
//     data: trip,
//     error: tripError,
// }: {
//     data: TripWithContract[] | null;

//     error: PostgrestError | null;
// } = await supabase
//     .from('trips')
//     .select('*, contract:contract!contract_contract_trip_id_foreign (*)')
//     .eq('trip_master_id', id);

// if (tripError) {
//     console.error(tripError);
//     return NextResponse.json(
//         { error: tripError?.message },
//         { status: 401 },
//     );
// }

// if (!trip) {
//     return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
// }
