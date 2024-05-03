"use server"
import { db } from "@/lib/db";
import { getUserbyEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const emailVerification = async (token: string) => {
    // console.log("provided token: "+ token)
    const existingToken = await getVerificationTokenByToken(token);
    console.log("Token found: "+ existingToken?.token);
    if(!existingToken){
        return {error: "Verification token does not exists!"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {error: "Verification token has expired!"}
    }

    const existingUser = await getUserbyEmail(existingToken.email);

    if(!existingUser){
        return {error: "Email does not exists!"}
    }

    await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            emailVerified: new Date(),
            email: existingToken.email,
        }
    });

    await db.verificationToken.delete({
        where: {id: existingToken.id}
    });

    return {success: "Email Verified"}
} 