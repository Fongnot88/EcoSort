import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://lasfelzuefspasxsxorl.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY || 'sb_publishable_z0zOfd2aXhF_uu8oKTH9NQ_6UwGCJsj';

export const supabase = createClient(supabaseUrl, supabaseKey);
