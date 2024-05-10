import { Badge } from "@/components/ui/badge"
import { ExtendedUser } from "@/next-auth"


interface UserInfoProps{
    user?: ExtendedUser
    label: string
}


export const UserInfo = ({
    user,
    label,
}: UserInfoProps) =>{
    return (
        <div className="p-5 w-full flex flex-col gap-2">
            <p>{label}</p>
            <div className="flex gap-3">
                <p>ID</p>
                <p>{user?.id}</p>
            </div>
            <div className="flex gap-3">
                <p>Name</p>
                <p>{user?.name}</p>
            </div>
            <div className="flex gap-3">
                <p>Email</p>
                <p>{user?.email}</p>
            </div>
            <div className="flex gap-3">
                <p>Two Factor</p>
                <Badge variant={
                    user?.isTwoFactorEnabled ? "default" : "destructive"
                }>
                {user?.isTwoFactorEnabled ? "ON" : "OFF"}
                </Badge>
                
            </div>
            <div className="flex gap-3">
                <p>Payment Status</p>
                <p>{user?.paymentStatus}</p>
            </div>

        </div>
    )
}

