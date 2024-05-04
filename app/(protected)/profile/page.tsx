"use client"


import { Button } from "@/components/ui/button"
import { useCurrentUser } from "@/hooks/useCurrentUser"
import { logOut } from "@/actions/logout"
import { useSession } from "next-auth/react"

const Profile =  () => {
  const user = useCurrentUser();
  const onClick = ()=> {
    logOut();
  }
  return (
    <div>
       {JSON.stringify(user)}
       <Button
       onClick={onClick}
       type="submit"
       > Sign out</Button>
    </div>
  )
}

export default Profile
