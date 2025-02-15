import { PartialBuddy } from '@/types/Auth.types';
import { PartialStory, StoryLikes } from '@/types/Story.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();

  const {
    data: likes,
    error: likesError,
  }: {
    data: StoryLikes[] | null;
    error: PostgrestError | null;
  } = await supabase.from('storylikes').select('*').eq('storylikes_story_id', id);

  if (likesError) {
    console.error(likesError);
    return NextResponse.json({ error: likesError?.message }, { status: 401 });
  }

  if (!likes) {
    return NextResponse.json({ error: 'Likes not found' }, { status: 404 });
  }

  return NextResponse.json(likes, { status: 200 });
}

export async function POST(request: NextRequest) {
  const { story_id, isLiked, buddy_id } = await request.json();

  if (!story_id) {
    return NextResponse.json({ error: 'story_id is required' }, { status: 400 });
  }

  const supabase = createClient();

  if (isLiked) {
    const { data, error }: { data: StoryLikes | null; error: PostgrestError | null } =
      await supabase
        .from('storylikes')
        .delete()
        .eq('storylikes_story_id', story_id)
        .eq('storylikes_buddy_id', buddy_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const {
      data: likes,
      error: likesError,
    }: {
      data: StoryLikes[] | null;
      error: PostgrestError | null;
    } = await supabase.from('storylikes').select('*').eq('storylikes_story_id', story_id);

    if (likesError) {
      console.error(likesError);
      return NextResponse.json({ error: likesError?.message }, { status: 401 });
    }

    const {
      data: story,
      error: storyError,
    }: { data: PartialStory | null; error: PostgrestError | null } = await supabase
      .from('stories')
      .select('story_created_by, story_id')
      .eq('story_id', story_id)
      .single();

    if (storyError) {
      return NextResponse.json({ error: storyError.message }, { status: 401 });
    }

    const {
      data: notification,
      error: notificationError,
    }: { data: Notification | null; error: PostgrestError | null } = await supabase
      .from('notifications')
      .delete()
      .eq('notification_sender', buddy_id)
      .eq('notification_receiver', story?.story_created_by)
      .eq('notification_origin_id', story_id)
      .eq('notification_type', 'like');

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }

    // console.log('notification delete success ====>', notification);

    return NextResponse.json({ isLiked: false }, { status: 201 });
  } else {
    const { data, error }: { data: StoryLikes | null; error: PostgrestError | null } =
      await supabase
        .from('storylikes')
        .insert([
          {
            storylikes_story_id: story_id,
            storylikes_buddy_id: buddy_id,
          },
        ])
        .select()
        .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    const {
      data: likes,
      error: likesError,
    }: {
      data: StoryLikes[] | null;
      error: PostgrestError | null;
    } = await supabase.from('storylikes').select('*').eq('storylikes_story_id', story_id);

    if (likesError) {
      console.error(likesError);
      return NextResponse.json({ error: likesError?.message }, { status: 401 });
    }

    const {
      data: story,
      error: storyError,
    }: { data: PartialStory | null; error: PostgrestError | null } = await supabase
      .from('stories')
      .select('story_created_by, story_id')
      .eq('story_id', story_id)
      .single();

    if (storyError) {
      return NextResponse.json({ error: storyError.message }, { status: 401 });
    }

    const {
      data: buddy,
      error: buddyError,
    }: { data: PartialBuddy | null; error: PostgrestError | null } = await supabase
      .from('buddies')
      .select('buddy_nickname')
      .eq('buddy_id', buddy_id)
      .single();

    if (buddyError) {
      return NextResponse.json({ error: buddyError.message }, { status: 401 });
    }

    const {
      data: notification,
      error: notificationError,
    }: { data: Notification | null; error: PostgrestError | null } = await supabase
      .from('notifications')
      .insert([
        {
          notification_type: 'like',
          notification_sender: buddy_id,
          notification_receiver: story?.story_created_by,
          notification_content: `${buddy?.buddy_nickname}님이 스토리를 좋아합니다.`,
          notification_origin_id: story_id,
        },
      ])
      .select()
      .single();

    if (notificationError) {
      return NextResponse.json({ error: notificationError.message }, { status: 401 });
    }

    // console.log('notification insert success ====>', notification);

    return NextResponse.json(likes, { status: 200 });
  }
}
