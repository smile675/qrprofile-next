"use server"

import { userCurrentPaymentStatus } from "@/lib/auth"
import { PaymentStatus } from "@prisma/client"

export const ProCall = async ()=> {
    const paymentStatus = await userCurrentPaymentStatus()

    if(paymentStatus === PaymentStatus.SUCCESS){
        return {success: "Alowed"}
    }

    return {error: "Not Allowed"}
}