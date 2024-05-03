"use server"
import bcrypt from "bcryptjs"
import { getUserbyEmail } from "@/data/user";
import { getPasswordResetTokenByToken } from "@/lib/resetToken";
import { NewPasswordSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
export const newPssword = async (
    values: z.infer<typeof NewPasswordSchema>,
    token? : string | null
)=> {

    if(!token){
        return {error: "Token not found"}
    }

    const validatedFields = NewPasswordSchema.safeParse(values);

    if (!validatedFields.success){
        return {error: "Invalid input"}
    }

    const {password} = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return {error: "Invalid Token"}
    }

    const hasExpired  = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Token has expired"}
    }

    const existingUser = await getUserbyEmail(existingToken.email)

    if (!existingUser){
        return {error: "Email does not exists!"}
    }

    const hashPassword = await bcrypt.hash(password, 10);


    await db.user.update({
        where: {id: existingUser.id},
        data: {
            password: hashPassword,
        }
    });

    await db.passwordResetToken.delete({
        where: {id: existingToken.id}
    });

    return {success: "Password updated successfully"}
}