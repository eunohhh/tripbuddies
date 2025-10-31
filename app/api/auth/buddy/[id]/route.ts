import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const supabase = await createClient();

  try {
    const { data: buddy, error } = await supabase
      .from("buddies")
      .select("*")
      .eq("buddy_id", id)
      .single();

    if (error) {
      console.error("버디 통신 오류 발생:", error);
      return NextResponse.json({ error: error?.message }, { status: 500 });
    }

    return NextResponse.json(buddy, { status: 200 });
  } catch (error) {
    console.error("버디 통신 오류 발생:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
