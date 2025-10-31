import type { PostgrestError } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type { Story, StoryWithBuddies } from "@/types/Story.types";
import { createClient } from "@/utils/supabase/server";

export async function GET(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();

	const {
		data: story,
		error: storyError,
	}: { data: Story | null; error: PostgrestError | null } = await supabase
		.from("stories")
		.select("*")
		.eq("story_id", id)
		.maybeSingle();

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
		.from("stories")
		.select("*, buddies:story_created_by (*)")
		.eq("story_created_by", story?.story_created_by)
		.order("story_created_at", { ascending: false });

	if (storiesError) {
		console.error(storyError);
		return NextResponse.json({ error: storiesError?.message }, { status: 401 });
	}

	if (!stories) {
		return NextResponse.json({ error: "Story not found" }, { status: 404 });
	}

	return NextResponse.json(stories, { status: 200 });
}

export async function DELETE(
	_req: NextRequest,
	{ params }: { params: Promise<{ id: string }> },
) {
	const { id } = await params;

	const supabase = await createClient();

	const {
		error: storyError,
	}: {
		error: PostgrestError | null;
	} = await supabase.from("stories").delete().eq("story_id", id);

	if (storyError) {
		console.error(storyError);
		return NextResponse.json({ error: storyError?.message }, { status: 401 });
	}

	return NextResponse.json(
		{ message: "story deleted successfully" },
		{ status: 200 },
	);
}
