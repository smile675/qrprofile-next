"use client"

import * as z from "zod"
import {useForm} from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { updateProfile } from "@/actions/profileUpdate"
import { ButtonLoading } from "@/components/global_components/loading-button"
import { Button } from "@/components/ui/button"
import { useState, useTransition } from "react"
import { ProfileUpdateSchema } from "@/schemas"

import { useSession } from "next-auth/react"



import { 
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
 } from "@/components/ui/form"
 import { Input } from "@/components/ui/input"

import { FormSuccess } from "@/components/global_components/form-success"
import { FormError } from "@/components/global_components/form-error"
import { Switch } from "@/components/ui/switch"

import { ExtendedUser } from "@/next-auth"


const ProfileSettings =  ({user}:{user: ExtendedUser}) => {

  

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const {update} = useSession();

  const onSubmit = (values: z.infer<typeof ProfileUpdateSchema>)=> {
    startTransition(()=>{
      console.log(values.password);
      setError("");
      setSuccess("")

      updateProfile(values)
      .then((data)=>{
        if(data.error){
          setError(data.error);
        }
        if(data.success){
          update();
          setSuccess(data.success);
        }
      })
      .catch(()=>{setError("Unknown error occured!")})
    })
  }

  const form = useForm<z.infer<typeof ProfileUpdateSchema>>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined,
      password: undefined,
      newPassword: undefined,
      isTwoFactorEnabled: user?.isTwoFactorEnabled || undefined,
    }
  })

  return (
    <div className="flex justify-center items-center p-3">
      <div className="w-[600px] max-sm:w-full">
        <p>Profile</p>

        <Form {...form}>
          <form 
          className="space-y-6"
          onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-6">
            <FormField
            control={form.control}
            name="name"
            render={({field})=>(
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  disabled = {isPending}
                  placeholder="Your name"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            {
              user?.isOAuth === false ? (
                <>
                <FormField
            control={form.control}
            name="email"
            render={({field})=>(
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  disabled = {isPending}
                  placeholder="Your Email"
                  type="email"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="password"
            render={({field})=>(
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  placeholder="******"
                  // type="password"
                  disabled = {isPending}
                  
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="newPassword"
            render={({field})=>(
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <Input 
                  {...field}
                  disabled = {isPending}
                  placeholder="******"
                  // type="password"
                  />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
            />
            <FormField
            control={form.control}
            name="isTwoFactorEnabled"
            render={({field})=>(
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                <div className="space-y-0.5">
                  <FormLabel>Two Factor Authentication</FormLabel>
                  <FormDescription>
                    Enable two factor authentication for your account
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                  disabled= {isPending}
                  checked = {field.value}
                  onCheckedChange={field.onChange}
                  />
                </FormControl>

              </FormItem>
              
            )}
            />
                </>
              ):
              <FormField
              control={form.control}
              name="email"
              render={({field})=>(
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input 
                    {...field}
                    disabled = {true}
                    placeholder="Your Email"
                    type="email"
                    />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
              />
            }
            
            </div>
            <FormSuccess message={success}/>
            <FormError message={error}/>

            {
            isPending? <ButtonLoading/>:
            <Button type="submit">
            Update
          </Button>}
          </form>
        </Form>
      </div>
    </div>
  )
}

export default ProfileSettings
