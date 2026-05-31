import { createClient, SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

function getClient(): SupabaseClient {
  if (!client) {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!url || !key) {
      // Build-time fallback — won't work for real queries
      client = createClient('https://placeholder.supabase.co', 'placeholder');
    } else {
      client = createClient(url, key);
    }
  }
  return client;
}

// Proxy so all .from() calls go through getClient()
export const supabase = new Proxy({} as SupabaseClient, {
  get(_, prop) {
    return (getClient() as any)[prop];
  },
});
