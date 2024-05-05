import { auth } from "@/auth"
import { currentUser } from "@/lib/auth"
import { ServerCog } from "lucide-react"
import { UserInfo } from "../_component/userInfo"

const ServerPage = async() => {
    const user = await currentUser()

    return (
        <UserInfo
        user={user}
        label="server"
        />
    )


}

export default ServerPage