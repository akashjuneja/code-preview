'use client'
import React, { useContext, useEffect, useState } from 'react'
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackCodeEditor, 
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
import { MessageContext } from '@/context/MessageContext';
import Prompt from '@/data/Prompt';
import axios from 'axios';
const CodeView = () => {
  const [files,setFiles]=useState(Lookup.DEFAULT_FILE)
  const [active,setActive]=useState('code')
  const {message}=useContext(MessageContext)
  const [loading,setLoading]=useState(false)

  useEffect(()=>{
    if (message?.length > 0) {
			const role = message[message.length - 1].role;
			if (role === "user") {
				generateAiCode();
			}
		}
  },[message])

  const generateAiCode=async ()=>{
    setLoading(true)
    const PROMPT=JSON.stringify(message) + " "+ Prompt.CODE_GEN_PROMPT
    const result =await axios.post('/api/gen-code',{
      prompt:PROMPT
    })
    const generatedCode=result.data
    const mergeFiles={...Lookup.DEFAULT_FILE,...generatedCode?.files}
    setLoading(false)
    setFiles(mergeFiles)
  }
  console.log(files)
  return (
    <div>
      <div className='bg-[#181818] w-full p-2'>
        <div className='flex gap-4 items-center flex-wrap shrink-0 justify-center  bg-black p-1 w-[140px] rounded-full '>
        <h2 className={`text-sm cursor-pointer ${active==='code' && 'text-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`} onClick={()=>{
          setActive('code')
        }}>Code</h2>
        <h2 className={`text-sm cursor-pointer ${active==='preview' && 'text-blue-500 bg-opacity-25 p-1 px-2 rounded-full'}`} onClick={()=>{
          setActive('preview')
        }}>Preview</h2>
        </div>
      </div>
      <SandpackProvider template="react" theme="dark" customSetup={{dependencies:{
        ...Lookup.DEPENDANCY
      }}} files={files} options={{externalResources:["https://cdn.tailwindcss.com"]}} >
  <SandpackLayout >
    {active==='code' ? <>
      <SandpackFileExplorer style={{height:'76vh'}}/>
      <SandpackCodeEditor style={{height:'76vh'}}/></> :<>
      <SandpackPreview style={{height:'76vh'}} showNavigator={true} />
      </>}
   
  </SandpackLayout >
</SandpackProvider>
    </div>
  )
}

export default CodeView