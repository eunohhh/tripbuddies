import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    return NextResponse.json({ error: 'Logout failed' }, { status: 500 });
  }

  return NextResponse.json({ message: 'Logout successful' }, { status: 200 });
}
