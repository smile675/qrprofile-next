"use client"
import { ProCall } from '@/actions/pro';
import { ProGate } from '@/components/auth/proGate';
import { Button } from '@/components/ui/button';

import React from 'react'
import { toast } from 'sonner';

const ProPage = () => {

    const onApiRouteClick = ()=>{
        fetch("/api/pro")
        .then((response)=>{
            if(response.ok){
                toast.success("Allowed")
            }else{
                toast.error("Access Denied")
            }
        })
    }

    const onServerClick = () =>{
        ProCall()
        .then((data)=>{
            if(data.success){
                toast.success(data.success)
            }
            if(data.error){
                toast.error(data.error);
            }
        })
    }

  return (
    <div>
       <ProGate
       >
        you are allowed
       </ProGate>

       <div className='flex gap-4 items-center'>
        <p>Pro only api route</p>
        <Button onClick={onApiRouteClick}>Test</Button>
       </div>

       <div className='flex gap-4 items-center'>
        <p>Pro only server route</p>
        <Button onClick={onServerClick}>Test</Button>
       </div>
    </div>
  )
}

export default ProPage
