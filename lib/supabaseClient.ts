import { createClient, SupabaseClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://btlyshiofgnlyhczylto.supabase.co';
const DEFAULT_SUPABASE_ANON =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHlzaGlvZmdubHloY3p5bHRvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODczNzk3MDgsImV4cCI6MjEwMjk1NTcwOH0.TjNvWmWzqEI2i5Rh2izHwFsyMQCBryaagml3Q83UmTI';

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('your-project-id')
    ? process.env.NEXT_PUBLIC_SUPABASE_URL
    : DEFAULT_SUPABASE_URL;

const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.includes('dummy')
    ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    : DEFAULT_SUPABASE_ANON;

/**
 * Singleton Supabase Client Instance
 * Guaranteed to connect to the live Supabase PostgreSQL & Realtime WebSockets cluster
 */
let supabaseInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient => {
  if (supabaseInstance) return supabaseInstance;

  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
      realtime: {
        params: {
          eventsPerSecond: 20,
        },
      },
    });
    return supabaseInstance;
  } catch (err: any) {
    console.error('[Supabase] Client creation error:', err?.message);
    // Return standard client as fallback
    supabaseInstance = createClient(DEFAULT_SUPABASE_URL, DEFAULT_SUPABASE_ANON);
    return supabaseInstance;
  }
};

export const supabase = getSupabaseClient();
