"use client"
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import * as z from 'zod'
import { NewPasswordSchema } from '@/schemas'
import { useSearchParams } from 'next/navigation'


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
import { ButtonLoading } from '../global_components/loading-button'
import { FormSuccess } from '../global_components/form-success'
import { newPssword } from '@/actions/newPassword'



export const NewPasswordForm = () => {
  
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [ispending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");


  const onSubmit = (values: z.infer<typeof NewPasswordSchema>)=>{
    setSuccess("");
    setError("");

     startTransition(()=>{
      newPssword(values, token)
      .then((data)=>{
        setError(data?.error);
        setSuccess(data?.success);

      });
     });
  }

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver : zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    }
  })

  return (
   <CardWrapper
    headerLabel='Enter a new passoword'
    backButtonLabel="Back to Login"
    backButtonHref='/login'
   >
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>

        <div className='space-y-4'>
          <FormField
            control={form.control}
            name='password'
            render={({ field })=>
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input {...field} placeholder='******' type='password' disabled = {ispending}/>
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
            Reset Password
          </Button>  
        }
        
        
      </form>
    </Form>
   </CardWrapper>
  )
}


