import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const Header = () => {
  return ( 
    <div className='flex justify-between p-4'>
        <div className='flex gap-3'>
        <Image src={'orange-logo.svg'} alt="logo" height={30} width={30} />
        <div className='text-xl font-semi-bold mb-0'>Live Code Preview</div>
        </div>
        <div className='flex gap-2'>
            <Button variant={'outline'}>Get Started</Button>
            <Button>Sign In</Button>

        </div>
    </div>
  )
}

export default Header