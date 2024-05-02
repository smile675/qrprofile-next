"use server"

import { signIn } from "@/auth";
import { getUserbyEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

import * as z from "zod"

export const login = async (values: z.infer<typeof LoginSchema> )=>{
    const validatedFields =  LoginSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error: "Invalid fields"};
    }

   const {email, password} = validatedFields.data;

   const existingUser = await getUserbyEmail(email);

   if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Email does not exists!"};
   }

   if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);

    // console.log("came to the function: verification token sent on login if email not verified")
    return {success: "Email not verified! Another verification email sent, please verify your email"}
    
   }

   try {
     await signIn("credentials", {
        email,
        password,
        redirectTo: DEFAULT_LOGIN_REDIRECT,
     });
   } catch (error) {
    // console.log(error);
     if(error instanceof AuthError){
        switch (error.type) {
            case "CredentialsSignin":
                return {error: "Invalid credentials"}
            default:
                return {error: "Unknown Error occured"}
        }
     }
     throw error
   }
}