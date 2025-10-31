import { createClient } from "@supabase/supabase-js";

/**
 * 서버 사이드에서 어드민 권한으로 Supabase 클라이언트를 생성합니다.
 * auth.admin API를 사용하기 위해 service_role 키가 필요합니다.
 * ⚠️ 주의: 이 클라이언트는 서버 사이드에서만 사용해야 하며, 절대 클라이언트에 노출되면 안 됩니다.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    throw new Error(
      "Missing Supabase environment variables. NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY are required.",
    );
  }

  return createClient(supabaseUrl, supabaseServiceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
