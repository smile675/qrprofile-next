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

export const LoginForm = () => {

  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  // const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (values: z.infer<typeof LoginSchema>)=>{
    // setSuccess("");
    setError("");
     startTransition(()=>{
      login(values)
      .then((data)=>{
        setError(data?.error);
        // setSuccess(data.success);
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

        <FormError message= {error}/>
        {/* <FormSuccess message={success}/> */}

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


