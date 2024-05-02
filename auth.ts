import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "@/auth.config"
import {PrismaAdapter} from "@auth/prisma-adapter"
import {db} from "@/lib/db"

import { getUserbyId } from "./data/user"
import { PaymentStatus } from "@prisma/client"

declare module "next-auth" {
    interface Session {
      user: {
        paymentStatus: PaymentStatus
      } & DefaultSession["user"]
    }
}


export const {
    handlers: {GET, POST},
    auth,
    signIn,
    signOut,
} = NextAuth({
    callbacks: {
        
        async session({token, session}){
            // console.log({
            //     sessonTOken: token,
            // });
            if(token.sub && session.user){
                session.user.id = token.sub;
            }
            
            if(token.paymentStatus && session.user){
                
                session.user.paymentStatus = token.paymentStatus;
            }
            // console.log({session});
            return session;
        },
        async jwt({token}){
            if(!token.sub) return token;
            const existingUser = await getUserbyId(token.sub);
            if(!existingUser) return token;
            token.paymentStatus = existingUser.paymentStatus;
            // console.log({token: token});
            return token;
        },
    },
    adapter: PrismaAdapter(db),
    session: {strategy: "jwt"},
    ...authConfig
})