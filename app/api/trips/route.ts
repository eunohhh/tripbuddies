import { TRIPS_ITEMS_PER_PAGE } from '@/constants/common.constants';
import { TripWithContract } from '@/types/Trips.types';
import { sliceArrayByLimit } from '@/utils/common/sliceArrayByLimits';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const pageString = searchParams.get('page');
  const supabase = createClient();

  // 총 아이템 수를 가져옵니다.
  const { count: totalItems, error: countError } = await supabase
    .from('trips')
    .select('trip_id', { count: 'exact', head: true });

  if (countError) {
    console.error(countError);
    return NextResponse.json({ error: countError?.message }, { status: 401 });
  }

  if (!totalItems) {
    return NextResponse.json({ error: 'Total items not found' }, { status: 404 });
  }

  if (pageString !== 'null') {
    const page = Number(pageString);
    const start = page * TRIPS_ITEMS_PER_PAGE;
    const end = start + TRIPS_ITEMS_PER_PAGE - 1;

    const {
      data: trips,
      error: tripError,
    }: {
      data: TripWithContract[] | null;
      error: PostgrestError | null;
    } = await supabase
      .from('trips')
      .select('*, contract (*)')
      .order('trip_created_at', { ascending: false })
      .range(start, end);

    if (tripError) {
      console.error(tripError);
      return NextResponse.json({ error: tripError?.message }, { status: 401 });
    }

    if (!trips) {
      return NextResponse.json({ error: 'Trips not found' }, { status: 404 });
    }

    // 총 페이지 수를 계산합니다.
    const totalPages = Math.ceil(totalItems / TRIPS_ITEMS_PER_PAGE);

    return NextResponse.json(
      {
        trips,
        totalItems,
        totalPages,
        currentPage: page + 1, // 1부터 시작하는 페이지 번호
      },
      { status: 200 },
    );
  }

  // 페이지 파라미터가 없는 경우 전체 데이터를 가져옵니다.
  const {
    data: trips,
    error: tripError,
  }: {
    data: TripWithContract[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('trips')
    .select('*, contract (*)')
    .order('trip_created_at', { ascending: false });

  if (tripError) {
    console.error(tripError);
    return NextResponse.json({ error: tripError?.message }, { status: 401 });
  }
  if (!trips) {
    return NextResponse.json({ error: 'Trips not found' }, { status: 404 });
  }

  const { slicedDataArray } = sliceArrayByLimit(trips, 8);

  // 총 페이지 수를 계산합니다.
  const totalPages = Math.ceil(totalItems / TRIPS_ITEMS_PER_PAGE);

  return NextResponse.json(
    {
      trips,
      allTrips: slicedDataArray,
      totalItems,
      totalPages,
      currentPage: 1, // 페이지 파라미터가 없으므로 첫 번째 페이지로 간주
    },
    { status: 200 },
  );
}

// import { TRIPS_ITEMS_PER_PAGE } from '@/constants/common.constants';
// import { TripWithContract } from '@/types/Trips.types';
// import { createClient } from '@/utils/supabase/server';
// import { PostgrestError } from '@supabase/supabase-js';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//     const { searchParams } = new URL(req.url);

//     const pageString = searchParams.get('page');

//     const supabase = createClient();

//     if (pageString) {
//         const page = Number(pageString);
//         const start = page * TRIPS_ITEMS_PER_PAGE;
//         const end = start + TRIPS_ITEMS_PER_PAGE - 1;

//         const {
//             data: trips,
//             error: tripError,
//         }: {
//             data: TripWithContract[] | null;
//             error: PostgrestError | null;
//         } = await supabase
//             .from('trips')
//             .select(
//                 '*, contract:contract!contract_contract_trip_id_foreign (*)',
//             )
//             .order('trip_created_at', { ascending: false })
//             .range(start, end);

//         if (tripError) {
//             console.error(tripError);
//             return NextResponse.json(
//                 { error: tripError?.message },
//                 { status: 401 },
//             );
//         }

//         if (!trips) {
//             return NextResponse.json(
//                 { error: 'Trips not found' },
//                 { status: 404 },
//             );
//         }
//         return NextResponse.json(trips, { status: 200 });
//     }

//     const {
//         data: trips,
//         error: tripError,
//     }: {
//         data: TripWithContract[] | null;
//         error: PostgrestError | null;
//     } = await supabase
//         .from('trips')
//         .select('*, contract:contract!contract_contract_trip_id_foreign (*)')
//         .order('trip_created_at', { ascending: false });

//     if (tripError) {
//         console.error(tripError);
//         return NextResponse.json(
//             { error: tripError?.message },
//             { status: 401 },
//         );
//     }

//     if (!trips) {
//         return NextResponse.json({ error: 'Trips not found' }, { status: 404 });
//     }
//     return NextResponse.json(trips, { status: 200 });
// }
