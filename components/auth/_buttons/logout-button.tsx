import { logOut } from "@/actions/logout";
import { redirect } from "next/navigation";


interface LogoutButtonProps{
    children? : React.ReactNode;
}

export const LogOutButton  = ({children}:  LogoutButtonProps)=>{
    const onClick = ()=> {
        logOut()
        
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}