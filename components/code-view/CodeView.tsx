'use client'
import React, { useState } from 'react'
import { 
  SandpackProvider, 
  SandpackLayout, 
  SandpackPreview, 
  SandpackCodeEditor, 
  SandpackFileExplorer
} from "@codesandbox/sandpack-react";
import Lookup from '@/data/Lookup';
const CodeView = () => {
  const [files,setFiles]=useState(Lookup.DEFAULT_FILE)
  const [active,setActive]=useState('code')
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
      }}} files={files} >
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