import { Story, StoryWithBuddies } from '@/types/Story.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();

  const { data: story, error: storyError }: { data: Story | null; error: PostgrestError | null } =
    await supabase.from('stories').select('*').eq('story_id', id).maybeSingle();

  if (storyError) {
    console.error(storyError);
    return NextResponse.json({ error: storyError?.message }, { status: 401 });
  }

  const {
    data: stories,
    error: storiesError,
  }: {
    data: StoryWithBuddies[] | null;
    error: PostgrestError | null;
  } = await supabase
    .from('stories')
    .select('*, buddies:story_created_by (*)')
    .eq('story_created_by', story?.story_created_by)
    .order('story_created_at', { ascending: false });

  if (storiesError) {
    console.error(storyError);
    return NextResponse.json({ error: storiesError?.message }, { status: 401 });
  }

  if (!stories) {
    return NextResponse.json({ error: 'Story not found' }, { status: 404 });
  }

  return NextResponse.json(stories, { status: 200 });
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const { id } = params;

  const supabase = createClient();

  const {
    error: storyError,
  }: {
    error: PostgrestError | null;
  } = await supabase.from('stories').delete().eq('story_id', id);

  if (storyError) {
    console.error(storyError);
    return NextResponse.json({ error: storyError?.message }, { status: 401 });
  }

  return NextResponse.json({ message: 'story deleted successfully' }, { status: 200 });
}
