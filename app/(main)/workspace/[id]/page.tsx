import ChatView from '@/components/chat-view/ChatView'
import CodeView from '@/components/code-view/CodeView'
import React from 'react'

const Workspace = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-3 gap-7 p-7'>
        <div>
        <ChatView />
        </div >
        <div className='col-span-2'>
        <CodeView />
        </div>
    </div>
  )
}

export default Workspace