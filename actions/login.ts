"use server"

import { signIn } from "@/auth";
import { getTwoFactorConfirmationByUserId } from "@/data/twoFactorConfirmation";
import { getTwoFactorTokenByEmail } from "@/data/twoFactorToken";
import { getUserbyEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail, sendTwoFactorTokenEmail } from "@/lib/mail";
import { generateVerificationToken, generateTwoFactorToken } from "@/lib/tokens";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";


import * as z from "zod"

export const login = async (
    values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
)=>{
    const validatedFields =  LoginSchema.safeParse(values);

    
    if(!validatedFields.success){
        return {error: "Invalid fields"};
    }

   const {email, password, twoFCode} = validatedFields.data;

   const existingUser = await getUserbyEmail(email);

   if(!existingUser || !existingUser.email || !existingUser.password){
    return {error: "Email does not exists!"};
   }

   if(!existingUser.emailVerified){
    const verificationToken = await generateVerificationToken(existingUser.email);

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    // console.log("came to the function: verification token sent on login if email not verified")
    return {success: "Email not verified! Another verification email sent, please verify your email"}
    
   }

   // if tow factor enabled, send email with the token
   if(existingUser.isTwoFactorEnabled && existingUser.email){

    // if login schema include two factor code check first
    if(twoFCode){
        // console.log({twoFCode})
        // if (!twoFCode || twoFCode.trim() === "") {
        //     return { error: "Please input a valid two-factor code" };
        // }
        const twoFCodeFromDB = await getTwoFactorTokenByEmail(existingUser.email);
        if(!twoFCodeFromDB){
            return {error: "Invalid Two-Factor Code"}
        }
        if(twoFCodeFromDB.token !== twoFCode){
            return {error: "Incorrect Two-Factor Code"}
        }

        //check if twofcode expired
        const hasExpired = new Date(twoFCodeFromDB.expires) < new Date();

        if (hasExpired){
            return {error: "Two Factor code expired!"}
        }

        // delete two factor token after all okay
        await db.twoFactorToken.delete({
            where: {
                id: twoFCodeFromDB.id
            }
        });

        // get two factor confirmation from db if already exist
        const existingTwoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)

        if(existingTwoFactorConfirmation){
            await db.twoFectorConfirmation.delete({
                where: {id: existingTwoFactorConfirmation.id}
            })
        }

        // create new two factor confirmation
        await db.twoFectorConfirmation.create({
            data: {
                userId: existingUser.id
            }
        });
    }else{
        const twoFactorToken = await generateTwoFactorToken(existingUser.email)
        await sendTwoFactorTokenEmail(
            twoFactorToken.email,
            twoFactorToken.token
        );
        return {twoFactor: true}
    }
   }

   try {
     await signIn("credentials", {
        email,
        password,
        
        redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
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