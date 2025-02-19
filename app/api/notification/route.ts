import { Notification } from '@/types/Notification.types';
import { createClient } from '@/utils/supabase/server';
import { PostgrestError } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    if (userError.message === 'Auth session missing!') {
      return new Response(JSON.stringify({ message: 'must be logged in to get notifications' }), {
        status: 200,
      });
    }
    return new Response(userError.message, { status: 500 });
  }

  if (!user) {
    return new Response('User not found', { status: 404 });
  }

  const {
    data: { buddy },
    error: buddyError,
  } = await supabase.from('buddies').select('*').eq('buddy_email', user.email).single();

  if (buddyError) {
    return new Response(buddyError.message, { status: 500 });
  }

  if (!buddy) {
    return new Response('Buddy not found', { status: 404 });
  }

  const {
    data: notifications,
    error,
  }: { data: Notification[] | null; error: PostgrestError | null } = await supabase
    .from('notifications')
    .select('*')
    .eq('notification_isRead', false)
    .eq('notification_receiver', buddy.buddy_id)
    .neq('notification_sender', buddy.buddy_id)
    .order('notification_created_at', { ascending: false });

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
