'use client'
import { Message, MessageContext } from '@/context/MessageContext'
import { UserContext } from '@/context/UserContext'
import { api } from '@/convex/_generated/api'
import Colors from '@/data/Colors'
import Lookup from '@/data/Lookup'
import { useMutation } from 'convex/react'
import { ArrowRight, Link } from 'lucide-react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

const ChatView = () => {
    const {id}=useParams()
    const workspace=useMutation(api.workspace.GetMessage)
    const {message,setMessages}=useContext(MessageContext)
    const {userDetails}=useContext(UserContext)
    const [userInput,setUserInput]=useState<string|undefined>();
    useEffect(()=>{
        getMessages()
    },[id])
    const getMessages=async ()=>{
        const messagesFromWorkspace=await workspace({
            id
        })
        setMessages(messagesFromWorkspace.message)  
    }
    
   const onGenerate=async (input:string)=>{
    setMessages([...message,{
        role:"user",
        content:input
    }])
   }
  return (
    <div className='flex flex-col h-[82vh]'> {/* Main container using flexbox */}
        <div className='flex-1 overflow-y-auto' > {/* Messages container, scrollable */}
            {message.map((msg:Message,idx)=>(
                <div className='flex gap-4 p-4 rounded-md' style={{backgroundColor:Colors.CHAT_BACKGROUND}} key={idx}>
                    <div >{
                        msg.role==="user" && (
                            <Image src={userDetails?.photo} alt='user-photo' height={35} width={35} className='rounded-full'/>
                        )
                        }</div>
                <div >{msg.content}</div>
                </div>
            ))}
        </div>

                {/* Text input at the bottom */}
        <div className='p-5 rounded-xl border max-w-xl w-full mb-4' style={{ background: Colors.BACKGROUND }}>
            <div className='flex gap-2  border-1'>
                <textarea placeholder={Lookup.INPUT_PLACEHOLDER} className='h-18 w-full border-none bg-transparent' onChange={(e: any) => {
                    setUserInput(e.target.value)
                }} />
                {userInput && <ArrowRight className='bg-primary rounded-xl' onClick={() => onGenerate(userInput)} />}
            </div>
            <div>
                <Link className='h-5 w-5' />
            </div>
        </div>
    </div>
  )
}

export default ChatView
