"use server"

import { getUserbyId } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { ProfileUpdateSchema } from "@/schemas"
import * as z from "zod"

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

    await db.user.update({
        where: {id:user.id},
        data: {...values}
    });

    return{success: "Profile Updated"}


}