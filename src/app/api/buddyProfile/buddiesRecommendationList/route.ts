import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  let isPending = true;

  // 아래 createClient 함수 내부에서 쿠키를 사용하기 때문에 try 문 안에 있으면 빌드에러가 발생합니다.
  // 따라서 여기서 생성해줍니다.
  const supabase = createClient();

  try {
    // buddies 테이블에서 buddy_temperature가 가장 높은 10명 가져오기
    const { data: buddies, error } = await supabase
      .from('buddies')
      .select('*')
      .order('buddy_temperature', { ascending: false })
      .limit(10);

    // 데이터베이스 에러 처리
    if (error) {
      console.error('버디 추천 리스트 통신 오류 발생:', error);
      isPending = false;
      return NextResponse.json(
        { buddies: null, error: error?.message, isPending },
        { status: 500 },
      );
    }

    // 성공 시 응답
    isPending = false;
    return NextResponse.json({ buddies, isPending }, { status: 200 });
  } catch (error) {
    // 일반 에러 처리
    console.error('버디 추천 리스트 통신 오류 발생:', error);
    isPending = false;
    return NextResponse.json({ buddies: null, error: '서버 오류', isPending }, { status: 500 });
  }
}
