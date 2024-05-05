"use client"

import { userCurrentPaymentStatus } from "@/hooks/userPaymnetStatus";
import { PaymentStatus } from "@prisma/client";
import { FormError } from "../global_components/form-error";

interface ProGateProps{
    children: React.ReactNode;
}

export const ProGate = ({
    children
}: ProGateProps)=>{
    const payMentStatus = userCurrentPaymentStatus()

    if(payMentStatus !== PaymentStatus.SUCCESS){
        return (
            <FormError message="You do not have permission to access this"/>
        )
    }
    return (
        <>{children}</>
    )

}