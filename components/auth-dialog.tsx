import { AuthDialogProps } from "@/lib/auth";
import { Dialog, DialogContent,  } from "./ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { DialogTitle } from "@radix-ui/react-dialog";
import { AuthForm } from "./auth-form";

export const AuthDialog:React.FC<AuthDialogProps>=({
    open,
  onClose,
  supabase,
  view
})=>{


    return(
<Dialog open={open} onOpenChange={onClose}>
  <DialogContent>
    <VisuallyHidden>
      <DialogTitle>
        Sign in to Code Preview
      </DialogTitle>
    </VisuallyHidden>
    <AuthForm  supabase={supabase} view={view}/>
  </DialogContent>
</Dialog>
    )
}