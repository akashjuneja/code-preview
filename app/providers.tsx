"use client"
import posthog from "posthog-js";
import { ReactNode } from "react";
import {PostHogProvider as PostHogProviderJs} from "posthog-js/react"
import { ThemeProviderProps } from "next-themes";
import {ThemeProvider as NextThemes} from "next-themes"

if(typeof window!==undefined && process.env.NEXT_PUBLIC_POSTHOG_ENABLE){
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_API_KEY ?? "",{
        api_host:process.env.NEXT_PUBLIC_POSTHOG_API_HOST,
        person_profiles:"identified_only",
        session_recording:{
            recordCrossOriginIframes:true
        }
    })

}

const PostHogProvider=({children}:{children:ReactNode})=>{
    return process.env.NEXT_PUBLIC_POSTHOG_ENABLE ? (
        <PostHogProviderJs client={posthog}>
            {children}
        </PostHogProviderJs>
    ):(
        children
    )
}

const ThemeProvider=({children,...props}:ThemeProviderProps)=>{
    return <NextThemes {...props}>{children}</NextThemes>
}

export {ThemeProvider,PostHogProvider}
