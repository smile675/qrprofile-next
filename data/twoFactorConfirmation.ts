import { db } from "@/lib/db";

export const getTwoFactorConfirmationByUserId = async (userId: string)=>{
    try {
        const twoFectorConfirmation = await db.twoFectorConfirmation.findUnique({
            where: {userId}
        })
        return twoFectorConfirmation
    } catch (error) {
        return null
    }
}