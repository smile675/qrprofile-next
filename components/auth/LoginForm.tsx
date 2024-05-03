"use client"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { LoginSchema } from '@/schemas'


import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form'
import { CardWrapper } from './card-wrapper'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { FormError } from '../global_components/form-error'
import { FormSuccess } from '../global_components/form-success'
import { login } from '@/actions/login'
import { ButtonLoading } from '../global_components/loading-button'
import { useSearchParams } from 'next/navigation'
import { FormWarning } from '../global_components/form-warning'
import Link from 'next/link'

export const LoginForm = () => {

  const searchParams = useSearchParams();

  const urlError = searchParams.get("error") === "OAuthAccountNotLinked"
  ? "Email already in use with different provider"
  : ""

  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  // const [warning, setWarning] = useState<string | undefined>("");

  const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
    setSuccess("");
    setError("");
    // setWarning("");
     startTransition(()=>{
      login(values)
      .then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);
        // setWarning(data?.warning);
      })
      ;
     });
  }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver : zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    }
  })

  return (
   <CardWrapper
    headerLabel='Welcome Back'
    backButtonLabel="Don't have an account?"
    backButtonHref='/register'
    showSocial
   >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field })=>
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='emailuser@example.com' type='email' disabled = {ispending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field })=>
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='*******' type='password' disabled = {ispending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }
          />
        </div>
        <Button variant="link" size= "sm" asChild className='px-0 font-normal'>
            <Link href="/reset-password">Forgot Password?</Link>
        </Button>

        <FormError message= {error || urlError}/>
        {/* <FormSuccess message={success}/> */}
        <FormWarning message={success}/>

        {
          ispending
          ? <ButtonLoading/>
          : <Button
          type='submit'
          className='w-full'
          disabled = {ispending}
          >
            Login
          </Button>  
        }
        
        
      </form>
    </Form>
   </CardWrapper>
  )
}


