import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jmenpztfdibrxypjppit.supabase.co";
const supabaseKey = "sb_publishable_fi7t8gljlKOIW6A3blcbCA_Tl5tjb13";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);