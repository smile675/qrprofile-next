"use server"
import bycrypt from "bcryptjs"
import { getUserbyEmail, getUserbyId } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { sendVerificationEmail } from "@/lib/mail"
import { generateVerificationToken } from "@/lib/tokens"
import { ProfileUpdateSchema } from "@/schemas"
import * as z from "zod"
import { revalidatePath } from "next/cache"



export const updateProfile = async (
    values: z.infer<typeof ProfileUpdateSchema>
)=>{
    const user = await currentUser();
    if(!user){
        return {error: "Unauthorized"}
    }

    const dbUser = await getUserbyId(user.id);

    if (!dbUser){
        return {error: "Could not find user"}
    }

    if(user.isOAuth){
        values.email = undefined;
        values.password = undefined;
        values.newPassword = undefined;
        values.isTwoFactorEnabled = undefined;
    }

    if(values.email && values.email !== user.email){
        const existingUser = await getUserbyEmail(values.email);
        if(existingUser && existingUser.id !== user.id){
            return {error: "Email already in use"}
        }

        const verificationToken = await generateVerificationToken(values.email);
        await sendVerificationEmail(
            verificationToken.email,
            verificationToken.token,
        );

        return {success: "Verification token sent to new email"}
    }

    if(values.password && values.newPassword && dbUser.password){
        const passwordMatch = await bycrypt.compare(
            values.password,
            dbUser.password,
        )

        if(!passwordMatch){
            return {error: "Incorrect password"}
        }

        const hashedPassword = await bycrypt.hash(values.password, 10);

        values.password = hashedPassword;
        values.newPassword = undefined;
    }

      console.log({...values}); 
    await db.user.update({
        where: {id:user.id},
        data: {...values}
    });

    revalidatePath("/")

    // unstable_update({
    //     user: {
    //         name: updatedUser.name,
    //         email: updatedUser.email,
    //         isTwoFactorEnabled: updatedUser.isTwoFactorEnabled,
    //         paymentStatus: updatedUser.paymentStatus,
    //         image: updatedUser.image,
    //     }
    // })

    return{success: "Profile Updated"}


}

//$2a$10$XIIyN.iazSYjvHbePLFZx.yHOFROz.Kjx.AVssG/6yitb9YU4I6lO
//$2a$10$XIIyN.iazSYjvHbePLFZx.yHOFROz.Kjx.AVssG/6yitb9YU4I6lO

//$2a$10$O5xZDackvIWbGvZRz6u/RuUuuP1H15WMUhtpQlvMPhe1AOFwMs7zS
//$2a$10$O5xZDackvIWbGvZRz6u/RuUuuP1H15WMUhtpQlvMPhe1AOFwMs7zS

//$2a$10$LJ/N2FcJE0CkWJMnjIDZzuzOBKXm6jQ5C8wfPjNcrqAg.5Rn8Kr9i