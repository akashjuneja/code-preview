import React, { useContext } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Lookup from '@/data/Lookup';
import { Button } from '../ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { UserContext } from '@/context/UserContext';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import uuid4 from "uuid4";

interface SignInDialogProps {
    open: boolean;
    setOpenDialog: () => void
}
const SignInDialog: React.FC<SignInDialogProps> = ({ open, setOpenDialog }) => {
    const {userDetails,setUserDetails}=useContext(UserContext)
    const CreateUser=useMutation(api.users.createUser)
    const googleLogin = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            const userInfo = await axios.get(
                'https://www.googleapis.com/oauth2/v3/userinfo',
                { headers: { Authorization: `Bearer ${tokenResponse?.access_token}` } },
            );
            const userData=userInfo?.data
           const savedUserRecord= await CreateUser({
                name:userData?.name,
                email:userData?.email,
                photo:userData?.picture,
                uid:uuid4()
            })
            if(typeof window!==undefined){
                localStorage.setItem('user',JSON.stringify(userData))
            }
            if(savedUserRecord){
                setUserDetails(savedUserRecord)
                setOpenDialog()
            }
            
        },
        onError: errorResponse => console.log(errorResponse),
    });
    return (
        <Dialog open={open} onOpenChange={setOpenDialog}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle></DialogTitle>
                    <DialogDescription className='flex flex-col justify-center items-center'>
                        <h2 className='font-bold text-2xl text-white'>{Lookup.SIGNIN_HEADING}</h2>
                        <p className='mt-2 text-center'>{Lookup.SIGNIN_SUBHEADING}</p>
                        <Button className='text-white mt-2' onClick={()=>{
                            googleLogin()
                        }}>Sign In with Google</Button>
                        <p className='mt-2 text-center'>{Lookup.SIGNIn_AGREEMENT_TEXT}</p>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default SignInDialog