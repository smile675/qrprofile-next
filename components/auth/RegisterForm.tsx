"use client"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { RegisterSchema } from '@/schemas'


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
import { register } from '@/actions/register'
import { ButtonLoading } from '../global_components/loading-button'


export const RegisterForm = () => {

  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const onSubmit = (values: z.infer<typeof RegisterSchema>)=>{
    setSuccess("");
    setError("");
     startTransition(()=>{
      register(values)
      .then((data)=>{
        setError(data.error);
        setSuccess(data.success);
      })
      ;
     });
  }

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver : zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      
    }
  })

  return (
   <CardWrapper
    headerLabel='Create an Account'
    backButtonLabel="Already has an account?"
    backButtonHref='/login'
    showSocial
   >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

        <div className='space-y-4'>
        <FormField
            control={form.control}
            name='name'
            render={({ field })=>
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='Your full name' type='text' disabled = {ispending}/>
                </FormControl>
                <FormMessage/>
              </FormItem>
            }
          />
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
        <FormSuccess message={success}/>

        {
          ispending
          ? <ButtonLoading/>
          : <Button
          type='submit'
          className='w-full'
          disabled = {ispending}
          >
            Create an account
          </Button>  
        }
        
        
      </form>
    </Form>
   </CardWrapper>
  )
}


