import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!url || !key || url.startsWith('YOUR_') || key.startsWith('YOUR_')) {
  console.warn(
    '[MotorVault] Supabase env vars are missing or still set to placeholders. ' +
    'Image upload will not work until VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env'
  );
}

// Use dummy values so createClient doesn't throw — upload calls will fail gracefully
export const supabase = createClient(
  url && !url.startsWith('YOUR_') ? url : 'https://placeholder.supabase.co',
  key && !key.startsWith('YOUR_') ? key : 'placeholder-key'
);
