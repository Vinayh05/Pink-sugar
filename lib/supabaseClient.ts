import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const isValidHttpUrl = (str: string): boolean => {
  try {
    const url = new URL(str);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
};

/**
 * Singleton Supabase Client Instance
 * Returns a configured Supabase client if valid credentials exist, or null with graceful fallback.
 */
let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (supabaseInstance) return supabaseInstance;

  if (isValidHttpUrl(supabaseUrl) && supabaseAnonKey && !supabaseUrl.includes('your-project-id')) {
    try {
      supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
        },
      });
      return supabaseInstance;
    } catch (err: any) {
      console.warn('[Supabase] Initialization warning:', err?.message);
      return null;
    }
  }

  return null;
};

export const supabase = getSupabaseClient();
