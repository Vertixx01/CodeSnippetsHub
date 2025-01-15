import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY must be defined'
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey);

export type CodeSnippet = {
  id: string;
  title: string;
  description: string;
  code: string;
  language: string;
  user_id: string;
  created_at: string;
  updated_at: string;
  likes: number;
  category: string[];
  rating: number;
  author: string;
};

export type Profile = {
  id: string;
  username: string;
  avatar_url?: string;
  created_at: string;
};