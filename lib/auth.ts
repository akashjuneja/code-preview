import { SupabaseClient } from "@supabase/supabase-js";

export type AuthViewType =
  | "sign_in"
  | "sign_up"
  | "magic_link"
  | "forgotten_password"
  | "update_password"
  | "verify_otp";

  export interface AuthDialogProps{
    open:boolean;
    onClose:()=>void;
    supabase:SupabaseClient;
    view:AuthViewType
  }