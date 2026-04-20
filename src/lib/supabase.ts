import { createClient } from "@supabase/supabase-js";

export const SUPABASE_URL = "https://clkqilqqpqybnrpieqyo.supabase.co";
export const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_RDVGx6pIOB4RxtlqSnlcCA_Kn4wXnd1";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

export const assetUrl = (path: string) =>
  supabase.storage.from("assets").getPublicUrl(path).data.publicUrl;
