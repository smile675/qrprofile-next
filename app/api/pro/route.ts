
import { userCurrentPaymentStatus } from "@/lib/auth";
import { PaymentStatus } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(){
    const paymentStatus = await userCurrentPaymentStatus()

    if( paymentStatus === PaymentStatus.SUCCESS){
        return new NextResponse(null, {status: 200});
    }
    return new NextResponse(null, {status: 403});
}