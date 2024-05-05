import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"

import { getUserbyId } from "./data/user"
import { PaymentStatus } from "@prisma/client"
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation"




export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    pages: {
        signIn: "/login",
        error: "/auth-error"
    },

    events: {
        async linkAccount({user}){
            await db.user.update({
                where: {id: user.id},
                data: {emailVerified: new Date()}
            });
        }
    },


    callbacks: {
        async signIn({user, account}){
            // alow Oauth
            if(account?.provider !== 'credentials') return true;
            const existingUser = await getUserbyId(user.id);
            if(!existingUser || !existingUser.emailVerified) return false;
            // prevent user to login if two factor enabled
            if(existingUser.isTowFectorEnabled) {
                const twoFactorConfirmation= await getTwoFactorConfirmationByUserId(existingUser.id)
                // if twofactor dont have not allow to log in
                if (!twoFactorConfirmation) return false

                // after login delete twofactor confirmation from db
                await db.twoFectorConfirmation.delete({
                    where: {
                        id: twoFactorConfirmation.id
                    }
                })
            }
            return true;
        },
        
        async session({token, session}){
            // console.log({
            //     sessonTOken: token,
            // });
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            
            if(token.paymentStatus && session.user){
                session.user.paymentStatus = token.paymentStatus as PaymentStatus;
            }
            if(session.user){
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }
            // console.log({session});
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserbyId(token.sub);
            if(!existingUser) return token;
            token.paymentStatus = existingUser.paymentStatus;
            token.isTwoFactorEnabled = existingUser.isTowFectorEnabled
            // console.log({token: token});
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})