import { createClient } from "@supabase/supabase-js";

export const supabase =process.env.NEXT_PUBLIC_SUPABASE_AUTH ? 
    createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    ) : null
    