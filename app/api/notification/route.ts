import { Notification } from '@/types/Notification.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const {
    data: notifications,
    error,
  }: { data: Notification[] | null; error: PostgrestError | null } = await supabase
    .from('notifications')
    .select('*');

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!notifications) {
    return new Response('No notifications found', { status: 404 });
  }

  return NextResponse.json(notifications, { status: 200 });
}

export async function POST(request: NextRequest) {
  const supabase = createClient();

  const notificationPayload = await request.json();

  // console.log('notificationPayload ====>', notificationPayload);

  const { data: notification, error }: { data: Notification | null; error: PostgrestError | null } =
    await supabase
      .from('notifications')
      .upsert([{ ...notificationPayload }], { ignoreDuplicates: false })
      .select()
      .single();

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  if (!notification) {
    return new Response('No notification found', { status: 404 });
  }

  return NextResponse.json(notification, { status: 201 });
}
