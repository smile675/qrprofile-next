import { logOut } from "@/actions/logout";
// import { signOut } from "next-auth/react"
import { useRouter  } from "next/navigation";
interface LogoutButtonProps{
    children? : React.ReactNode;
}

export const LogOutButton  = ({children}:  LogoutButtonProps)=>{
    const router = useRouter()
    const onClick = ()=> {
        logOut()
        // signOut()
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}

