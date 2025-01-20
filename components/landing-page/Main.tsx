'use client'
import { MessageContext } from '@/context/MessageContext'
import { UserContext } from '@/context/UserContext'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { ArrowRight, Link } from 'lucide-react'
import React, { useContext, useState } from 'react'
import SignInDialog from '../sign-in-dialog/SignInDialog'
import { useMutation } from 'convex/react'
import { api } from '@/convex/_generated/api'
import { useRouter } from 'next/navigation'

const Main = () => {
    const [userInput, setUserInput] = useState()
    const { setMessage } = useContext(MessageContext)
    const {userDetails}=useContext(UserContext)
    const [openDialog,setOpenDialog]=useState(false)
    const CreateWorkspace=useMutation(api.workspace.CreateWorkspace)
    const router=useRouter()    
    const onGenerate = async (input: any) => {
        if(userDetails?.name){
            setMessage([{
                role:"user",
                content:input
            }])
            console.log(userDetails)
           const workSpaceId= await CreateWorkspace({
            user:userDetails._id,
            message:[{
                role:"user",
                content:input
            }]
           })
           if(workSpaceId){
            router.push(`/workspace/${workSpaceId}`)
           }
        }else{
            setOpenDialog(true)
        }
        
    }
    return (
        <div>
        <div className='flex flex-col items-center justify-center mt-28'>
            <div className='text-4xl font-bold'>{Lookup.HERO_HEADING}</div>
            <div className='font-medium text-gray-300 mb-2'>{Lookup.HERO_DESC}</div>
            <div className='p-5 rounded-xl border max-w-xl w-full mb-4' style={{ background: Colors.BACKGROUND }}>
                <div className='flex gap-2  border-1'>
                    <textarea placeholder={Lookup.INPUT_PLACEHOLDER} className='h-36 w-full border-none bg-transparent' onChange={(e: any) => {
                        setUserInput(e.target.value)
                    }} />
                    {userInput && <ArrowRight className='bg-primary rounded-xl' onClick={() => onGenerate(userInput)} />}
                </div>
                <div>
                    <Link className='h-5 w-5' />
                </div>
            </div>

            <div className='flex flex-wrap gap-2 max-w-xl justify-center items-center'>
                {
                    Lookup.SUGGSTIONS.map((suggestion) => (
                        <div className='border rounded-full p-1 px-2 text-sm text-gray-400 hover:text-white cursor-pointer' onClick={() => onGenerate(suggestion)}>
                            {suggestion}
                        </div>
                    ))
                }
            </div>

        </div>
        {
            openDialog && <SignInDialog open={openDialog} setOpenDialog={()=>setOpenDialog(false)}/>
        }
        </div>
    )
}

export default Main