import { createClient } from '@supabase/supabase-js';

// Transparência: Estas chaves foram fornecidas pelo usuário e estão configuradas como fallback.
// Recomenda-se definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no painel de Segredos.
const getEnv = (key: string, fallback: string) => {
  const value = import.meta.env[key];
  if (typeof value === 'string' && value.trim().length > 0) {
    if (key.includes('URL') && !value.startsWith('http')) return fallback;
    return value;
  }
  return fallback;
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL', 'https://clkqilqqpqybnrpieqyo.supabase.co');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY', 'sb_publishable_RDVGx6pIOB4RxtlqSnlcCA_Kn4wXnd1');

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
