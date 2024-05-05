import { PaymentStatus } from "@prisma/client"
import NextAuth, {type DefaultSession} from "next-auth"

export type ExtendedUser = DefaultSession["user"] & {
  paymentStatus : PaymentStatus,
  isTwoFactorEnabled : boolean
}


declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}