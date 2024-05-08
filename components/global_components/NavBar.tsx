

import React from 'react'

import mainMenu from '@/app/assets/data/mainMenu'
import { Button } from '../ui/button';
import Link from 'next/link';

import { Menu } from 'lucide-react';
import { Drawer, DrawerContent, DrawerTrigger } from '../ui/drawer';


import LoginButton from '../auth/loginButton';
import { UserButton } from '../auth/_buttons/user-button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { User } from 'next-auth';

const NavBar = ({user}: {user: User | undefined}) => {
   
  //new navbar
  return (
    <nav className='w-full h-14 bg-secondary border-b-2 flex justify-between items-center px-4'>
      <div>{/* Drawer [small device]*/}</div>
      <div>Menu button</div>
      <UserButton user={user}/> 
    </nav>
  )

  // old navbar
  // return (
  //   <div className='flex justify-between max-md:justify-start max-md:gap-3 items-center px-5 w-full h-20 bg-primary shadow-mb shadow-primary'>
  //      <div className='hidden max-md:block'>
  //      <Drawer
  //      direction='left'>
  //       <DrawerTrigger>
  //           <Menu className='text-primary-foreground'/>
  //       </DrawerTrigger>
  //       <DrawerContent
  //       className='h-screen top-0 right-0 left-auto mt-0 w-[80%] rounded-none mr-[20%] bg-card'
  //       >
  //       <div className='flex flex-col pt-5 items-start'>
  //       {
  //       mainMenu.map((item)=>{
  //           return (
  //               <Button
  //               className='text-card-foreground text-sm '
  //               key={item.name} variant="link">
  //               <Link href={item.link}>{item.name}</Link>
  //               </Button>
  //           )
  //       })
  //       }
  //       </div>
  //       <div>
  //       <LoginButton>
  //       <Button variant="ghost">
  //               Login
  //       </Button>
  //       </LoginButton>
  //       </div>

  //       </DrawerContent>
  //      </Drawer>
  //      </div>
  //     <div className='font-bold text-3xl text-primary-foreground cursor-pointer max-md:text-2xl max-sm:text-xl' >
  //       <Link href="/">QR PROFILE</Link>
  //     </div>
  //     <div className='max-md:hidden'>
  //       {
  //       mainMenu.map((item)=>{
  //           return (
  //               <Button
  //               className='text-primary-foreground text-2xl'
  //               key={item.name} variant="link">
  //               <Link href={item.link}>{item.name}</Link>
  //               </Button>
  //           )
  //       })
  //       }
  //     </div>
  //     <div className='max-md:hidden'>

  //       <LoginButton>
  //       <Button
        
  //       variant="ghost" 
  //       className='text-primary-foreground hover:text-primary text-2xl'>
  //               Login
  //       </Button>
  //       </LoginButton>
  //     </div>
  //   </div>
  // )


}

export default NavBar
