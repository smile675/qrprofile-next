import { useSession } from "next-auth/react";

export const userCurrentPaymentStatus = ()=> {
    const session = useSession()
    return session?.data?.user?.paymentStatus
}