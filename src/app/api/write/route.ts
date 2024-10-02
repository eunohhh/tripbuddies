import { Contract } from '@/types/Contract.types';
import { PartialTrip, TripWithContract } from '@/types/Trips.types';
import { getUserIdAndModeFromHeader } from '@/utils/auth/getUserIdFromHeader';
import convertToWebP from '@/utils/common/convertToWebp';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const OPEN_AI_SECRET_KEY = process.env.OPEN_AI_SECRET_KEY;

export async function POST(req: NextRequest) {
  const supabase = createClient();

  try {
    // 헤더에서 사용자 ID를 가져옴
    const headerData = getUserIdAndModeFromHeader(req);

    if (!headerData) {
      return NextResponse.json({ trip: null, error: '헤더 데이터가 없습니다.' }, { status: 401 });
    }

    const { userId, mode } = headerData;

    if (!userId) {
      return NextResponse.json({ trip: null, error: '사용자 ID가 없습니다.' }, { status: 401 });
    }
    if (!mode) {
      return NextResponse.json({ trip: null, error: '모드가 없습니다.' }, { status: 401 });
    }

    const formData = await req.formData();
    const tripDataString = formData.get('trip_json');
    const tripImageFile = formData.get('trip_image') as File;
    const tripData: PartialTrip = JSON.parse(tripDataString as string);

    // console.log('tripDataString 라우트에서 ====>', tripDataString);
    // console.log('tripImageFile 라우트에서 ====>', tripImageFile);

    if (!tripDataString) {
      return NextResponse.json({ trip: null, error: 'Invalid trip data' }, { status: 400 });
    }

    if (!tripImageFile && mode === 'new' && tripData) {
      const openai = new OpenAI({
        apiKey: OPEN_AI_SECRET_KEY,
      });

      const [continent, country] = tripData.trip_final_destination?.split(' ') || [];

      // OpenAI를 사용하여 이미지를 생성
      const imageGeneration = await openai.images.generate({
        model: 'dall-e-3',
        // prompt: `${continent}의 경관, ${country}의 랜드마크, 하늘 최소화, 실제 사진, 맑은 날씨, 도시 경관 위주`,
        prompt: `고공에서 바라본 ${country} 도시의 경관, 높은 앵글에서의 촬영`,
        n: 1,
        // size: '512x512',
        response_format: 'url', // URL로 이미지 반환
      });

      // console.log(
      //     'revised prompt ====>',
      //     imageGeneration.data[0].revised_prompt,
      // );
      const imageUrl = imageGeneration.data[0].url;

      if (!imageUrl) {
        return NextResponse.json({ error: '이미지 생성 중 오류 발생' }, { status: 500 });
      }
      // 이미지 다운로드
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      // WebP 변환 및 파일 업로드를 병렬로 처리
      const imageBufferPromise = convertToWebP(blob, 512);
      const filePath = `trips_${Date.now()}.webp`;

      const [imageBuffer] = await Promise.all([imageBufferPromise]);

      if (!imageBuffer) {
        return NextResponse.json({ error: '이미지 변환 중 오류 발생' }, { status: 500 });
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from('trips')
        .upload(filePath, imageBuffer, {
          contentType: 'image/webp',
        });

      if (imageError) {
        return NextResponse.json({ error: '이미지 업로드 중 오류 발생' }, { status: 500 });
      }

      const { data: publicUrl } = supabase.storage.from('trips').getPublicUrl(filePath);

      tripData.trip_thumbnail = publicUrl.publicUrl;
    }

    if (tripImageFile) {
      const imageBuffer = await convertToWebP(tripImageFile, 1080);
      const filePath = `trips_${Date.now()}.webp`;

      if (!imageBuffer) {
        return NextResponse.json({ error: '이미지 변환 중 오류 발생' }, { status: 500 });
      }

      const { data: imageData, error: imageError } = await supabase.storage
        .from('trips')
        .upload(filePath, imageBuffer, {
          contentType: 'image/webp',
        });

      if (imageError) {
        return NextResponse.json({ error: '이미지 업로드 중 오류 발생' }, { status: 500 });
      }

      const { data: publicUrl } = supabase.storage.from('trips').getPublicUrl(filePath);

      tripData.trip_thumbnail = publicUrl.publicUrl;
    }

    // 'trips' 테이블에 여행 데이터를 삽입
    const {
      data: trip,
      error: tripError,
    }: {
      data: TripWithContract | null;
      error: PostgrestError | null;
    } = await supabase
      .from('trips')
      .upsert({ ...tripData })
      .select()
      .single();

    if (tripError || !trip) {
      console.error('게시글 업데이트 중 오류 발생:', tripError);
      return NextResponse.json({ error: tripError?.message }, { status: 500 });
    }
    const tripId = trip.trip_id;

    const {
      data: relatedContracts,
      error: selectError,
    }: { data: Contract[] | null; error: PostgrestError | null } = await supabase
      .from('contract')
      .select('*')
      .eq('contract_trip_id', tripId);

    if (selectError) {
      return NextResponse.json({ error: selectError?.message }, { status: 500 });
    }

    // if (!relatedContracts) {
    //     return NextResponse.json(
    //         { error: '연관된 계약이 없습니다.' },
    //         { status: 500 },
    //     );
    // }

    if (mode === 'patch') {
      if (!relatedContracts) {
        return NextResponse.json({ error: '연관된 계약이 없습니다.' }, { status: 500 });
      }
      trip.contract = relatedContracts;
      return NextResponse.json(trip, { status: 200 });
    } else {
      const today = new Date();
      const tripEndDate = new Date(trip.trip_end_date);
      const isValidate = today <= tripEndDate;
      const contractData = {
        contract_trip_id: tripId,
        contract_buddy_id: userId,
        contract_start_date: trip.trip_start_date,
        contract_end_date: trip.trip_end_date,
        contract_isLeader: true,
        contract_isPending: false, // 내가 만든 여정이고 따라서 생성되는 계약 isPending 기본값은 false
        contract_isValidate: isValidate,
      };

      // 먼저 데이터를 삽입
      const { data: insertedData, error: insertError } = await supabase
        .from('contract')
        .insert(contractData)
        .select('*');

      if (insertError) {
        return NextResponse.json({ error: insertError?.message }, { status: 500 });
      }

      if (!insertedData) {
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
      }
      // 삽입이 성공시, 관련된 tripId로 데이터를 조회
      const {
        data: relatedContracts,
        error: selectError,
      }: { data: Contract[] | null; error: PostgrestError | null } = await supabase
        .from('contract')
        .select('*')
        .eq('contract_trip_id', tripId);

      if (selectError) {
        return NextResponse.json({ error: selectError?.message }, { status: 500 });
      }

      if (!relatedContracts) {
        return NextResponse.json({ error: '서버 오류' }, { status: 500 });
      }

      trip.contract = relatedContracts;

      return NextResponse.json(trip, { status: 200 });
    }
  } catch (error) {
    console.error('요청 처리 중 오류 발생:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  }
}
