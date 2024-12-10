import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { ArrowRight, MoonIcon, RefreshCcw, SunIcon, Trash, Undo } from "lucide-react"
import Link from "next/link"
import { Button } from "./ui/button"
import { useTheme } from "next-themes"
import { Session } from "@supabase/supabase-js"
import { DropdownMenu, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { Avatar, AvatarImage } from "@radix-ui/react-avatar"

export const Navbar=({
  session,
  showLogin,
  signOut,
  onClear,
  canClear,
  onSocialClick,
  onUndo,
  canUndo,
}:{
  session:Session|null;
  showLogin:()=>void;
  signOut:()=>void;
  onClear:()=>void;
  canClear:boolean;
  onSocialClick:(target:"github"|"x"|"discord")=>void;
  onUndo:()=>void;
  canUndo:boolean;
})=>{
  const {theme,setTheme}=useTheme()
    return (
        <nav className="w-full flex bg-background p-4">
      <div className="flex flex-1 items-center">
        <Link href={"/"} className="flex items-center gap-2">
          <RefreshCcw className="w-6 h-6 dark:text-white " />
          <h1 className="whitespace-pre">Code Preview</h1>
        </Link>
      </div>
      <div>
        <TooltipProvider >
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button variant={"ghost"} size={"icon"} onClick={onUndo} disabled={!canUndo}>
                <Undo className="w-6 h-6 md:h-5 md:w-5 dark:text-white " />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Undo</TooltipContent>
          </Tooltip>
          
        </TooltipProvider>

        <TooltipProvider >
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button variant={"ghost"} size={"icon"} onClick={onClear} disabled={!canClear}>
                <Trash className="w-6 h-6 md:h-5 md:w-5 dark:text-white " />
              </Button>
            </TooltipTrigger>
            <TooltipContent>Delete Chat</TooltipContent>
          </Tooltip>
          
        </TooltipProvider>

        <TooltipProvider >
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button variant={"ghost"} size={"icon"} onClick={()=>{setTheme(theme==="dark"?"light":"dark")}} disabled={false}>
                {
                  theme==="light" ? (
                    <SunIcon className="w-6 h-6 md:h-5 md:w-5 dark:text-white "/>
                  ):(
                    <MoonIcon className="w-6 h-6 md:h-5 md:w-5 dark:text-white "/>
                  )
                }
              </Button>
            </TooltipTrigger>
            <TooltipContent>Toggle Theme</TooltipContent>
          </Tooltip>
          
        </TooltipProvider>
        {
          session ?(
            <DropdownMenu>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <DropdownMenuTrigger asChild>
            <Avatar className="w-6 h-6 md:h-5 md:w-5 " >
              <AvatarImage src={session.user.user_metadata.avatar_url || "https://avatar.vercel.sh"+session.user.email} alt="avatar-image"
               />
              </Avatar>
                    </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>My Account</TooltipContent>
                  </Tooltip>
              </TooltipProvider>
            </DropdownMenu>
          ):(
            <Button variant={"default"} onClick={showLogin}>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          )
        }
      </div>
      
      </nav>
    )

}