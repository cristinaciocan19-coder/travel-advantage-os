import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase env vars. Check .env.local and Vercel settings.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export type Profile = {
  id: string;
  email: string | null;
  default_name: string;
  presentation_link: string;
  telegram_chat_id: string | null;
  daily_tasks: Record<string, boolean>;
  created_at: string;
  updated_at: string;
};

export type LeadStatus = "nou" | "intro" | "follow-up" | "prezentare";

export type Lead = {
  id: string;
  user_id: string;
  name: string;
  contact: string;
  note: string;
  status: LeadStatus;
  created_at: string;
  updated_at: string;
};

export type Reminder = {
  id: string;
  user_id: string;
  lead_id: string | null;
  date: string;
  note: string;
  done: boolean;
  created_at: string;
};
