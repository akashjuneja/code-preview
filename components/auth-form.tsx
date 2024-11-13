import { AuthViewType } from "@/lib/auth";
import { SupabaseClient } from "@supabase/supabase-js";

function AuthForm({
    supabase,
    view
}:{
    supabase:SupabaseClient;
    view:AuthViewType
}){
    return (
        <div>
            <h1>Sign in to UI Preview Code Generator</h1>
        </div>
    )
}

