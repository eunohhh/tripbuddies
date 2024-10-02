import { NextRequest } from 'next/server';

export function getUserIdAndModeFromHeader(
  req: NextRequest,
): { userId: string; mode: string } | null {
  const userId = req.headers.get('user');
  const mode = req.headers.get('mode');
  if (!userId || !mode) {
    return null;
  }
  return { userId, mode };
}
