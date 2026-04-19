import { createClient } from '@supabase/supabase-js';

// Transparência: Estas chaves foram fornecidas pelo usuário e estão configuradas como fallback.
// Recomenda-se definir VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY no painel de Segredos.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://clkqilqqpqybnrpieqyo.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_RDVGx6pIOB4RxtlqSnlcCA_Kn4wXnd1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
