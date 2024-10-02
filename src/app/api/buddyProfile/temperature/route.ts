import { createClient } from '@/utils/supabase/server';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { currentBuddyId } = await req.json();

  if (!currentBuddyId) {
    return NextResponse.json(
      { message: '버디 정보가 조회되지 않았습니다.' },
      {
        status: 400,
      },
    );
  }

  const supabase = createClient();

  try {
    const { data: buddy, error: selectError } = await supabase
      .from('buddies')
      .select('buddy_temperature')
      .eq('buddy_id', currentBuddyId)
      .single();

    if (selectError || !buddy) {
      return NextResponse.json(
        {
          message: '버디 정보를 불러오지 못했습니다.',
          error: selectError?.message || '알 수 없는 오류가 발생했습니다.',
        },
        { status: 500 },
      );
    }

    if (buddy.buddy_temperature >= 99) {
      return NextResponse.json(
        {
          message: '버디즈 지수가 99 이상입니다. 더 이상 증가할 수 없습니다.',
        },
        { status: 200 },
      );
    }

    const updatedTemperature = buddy.buddy_temperature + 1;

    const { error: updateError } = await supabase
      .from('buddies')
      .update({ buddy_temperature: updatedTemperature })
      .eq('buddy_id', currentBuddyId);

    if (updateError) {
      return NextResponse.json(
        {
          message: '버디즈 지수가 증가되지 않았습니다.',
          error: updateError.message || '알 수 없는 오류가 발생했습니다.',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ buddy_temperature: updatedTemperature }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: '서버 오류가 발생했습니다.' },
      {
        status: 500,
      },
    );
  }
}
