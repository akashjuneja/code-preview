import { AppProps } from "next/app";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";

if(typeof window!==undefined && process.env.NEXT_PUBLIC_POSTHOG_ENABLE){
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY ?? "",{
        api_host:process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
        person_profiles:"identified_only",
        session_recording:{
            recordCrossOriginIframes:true
        }
    })

}


export default function App({Component, pageProps}:AppProps){
    return (
        <PostHogProvider client={posthog}>
            <Component {...pageProps } />
        </PostHogProvider>
    )
}