import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { usePostHog } from "posthog-js/react";

export type AuthViewType =
  | "sign_in"
  | "sign_up"
  | "magic_link"
  | "forgotten_password"
  | "update_password"
  | "verify_otp";

export interface AuthDialogProps {
  open: boolean;
  onClose: () => void;
  supabase: SupabaseClient;
  view: AuthViewType;
}

export const useAuth = (
  setAuthDialog: (value: boolean) => void,
  setAuthView: (value: AuthViewType) => void
) => {
  const posthog = usePostHog();
  let recovery=false;
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    if (!supabase) {
      return setSession({
        user: {
          email: "demo@user.com",
        },
      } as Session);
    }
    // Suggested code may be subject to a license. Learn more: ~LicenseLog:163506979.
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) {
        posthog.identify(session.user.id, {
          email: session.user.email,
        });
        posthog.capture("sign_in");
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if(_event==="PASSWORD_RECOVERY"){
          recovery=true
          setAuthView("update_password");
          setAuthDialog(true);
        }
        if(_event==="USER_UPDATED" && recovery){
          recovery=false;
        }

        if(_event==="SIGNED_IN" && !recovery){
          setAuthDialog(false);
          posthog.identify(session?.user.id, {
            email: session?.user.email,
          });
          posthog.capture("sign_in");
        }
        if(_event==="SIGNED_OUT"){
          setAuthView("sign_in");
          posthog.reset();
          posthog.capture("sign_out");
        }

      }
    );
    // unsubscribe to avoid memory leak
    return () => {
      subscription.unsubscribe(); 
    };
  }, []); 

  return { session }; 
};
