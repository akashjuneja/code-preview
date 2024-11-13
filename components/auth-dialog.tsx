import { AuthDialogProps } from "@/lib/auth";
import { Dialog, DialogContent,  } from "./ui/dialog";


export const AuthDialog:React.FC<AuthDialogProps>=({
    open,
  onClose,
  supabase,
  view
})=>{


    return(
<Dialog open={open} >
  <DialogContent>
    
  </DialogContent>
</Dialog>
    )
}