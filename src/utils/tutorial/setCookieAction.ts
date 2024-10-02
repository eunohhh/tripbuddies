'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function setCookieAction() {
  const cookieStore = cookies();
  cookieStore.set({
    name: 'hasVisitedTutorial',
    value: 'true',
    path: '/',
    sameSite: 'lax',
  });

  redirect('/');
}
