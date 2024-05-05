"use client"
import { ProGate } from '@/components/auth/proGate';
import { Button } from '@/components/ui/button';

import React from 'react'

const ProPage = () => {

  return (
    <div>
       <ProGate
       >
        you are allowed
       </ProGate>

       <div className='flex gap-4 items-center'>
        <p>Pro only api route</p>
        <Button>Test</Button>
       </div>

       <div className='flex gap-4 items-center'>
        <p>Pro only server route</p>
        <Button>Test</Button>
       </div>
    </div>
  )
}

export default ProPage
