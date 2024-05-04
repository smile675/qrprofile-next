import { db } from "@/lib/db";

export const getTwoFactorTokenByToken = async (token: string)=>{
    try {
        const twoFectorToken = await db.twoFactorToken.findUnique({
            where: {token}
        })
        return twoFectorToken
    } catch (error) {
        return null
    }
}

export const getTwoFactorTokenByEmail = async (email: string)=>{
    try {
        const twoFectorToken = await db.twoFactorToken.findFirst({
            where: {email}
        })
        return twoFectorToken
    } catch (error) {
        return null
    }
}