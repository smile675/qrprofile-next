"use server"
import * as z from "zod";
import { PasswordResetSchema } from "@/schemas"
import { getUserbyEmail } from "@/data/user"
import { generatePasswordReturnToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";


export const passwordReset = async (values: z.infer<typeof PasswordResetSchema>)=>{
    const validateFields = PasswordResetSchema.safeParse(values);
    if(!validateFields.success){
        return {error : "Invalid Input"}
    }

    const {email} = validateFields.data;
    const existingUser = await getUserbyEmail(email);

    if(!existingUser){
        return {error: "Email not found"}
    }

    //generate token
    const passwordResetToken  = await generatePasswordReturnToken(email);

    // send email

    await sendPasswordResetEmail(
        passwordResetToken.email,
        passwordResetToken.token,
    )
    

    return {success: "Reset email sent"};
}