"use server"

import { db } from "@/lib/db";
import bcrypt from "bcryptjs"

import { RegisterSchema } from "@/schemas";

import * as z from "zod"
import { getUserbyEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema> )=>{
    const validatedFields =  RegisterSchema.safeParse(values);
    
    if(!validatedFields.success){
        return {error: "Invalid fields"};
    }

    const { email, password, name } = validatedFields.data;

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const existingUser = await getUserbyEmail(email);

    if(existingUser){
        return {error: "This email already in use"}
    }

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
        }
    });

    //TODO send verification token email.
    

    return {
        success: "User created"
    }
}