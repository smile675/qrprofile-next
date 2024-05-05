"use client"


import { useCurrentUser } from "@/hooks/useCurrentUser"
import { UserInfo } from "../_component/userInfo"

const ClientPage = () => {
   const user = useCurrentUser()

    return (
        <UserInfo
        user={user}
        label="Client"
        />
    )


}

export default ClientPage