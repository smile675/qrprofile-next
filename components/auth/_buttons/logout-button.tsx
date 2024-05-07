import { logOut } from "@/actions/logout";
// import { useSession } from "next-auth/react";



interface LogoutButtonProps{
    children? : React.ReactNode;
}

export const LogOutButton  = ({children}:  LogoutButtonProps)=>{
    const onClick = ()=> {
        logOut()
        // let session = useSession();
        // session.data = null;
    }

    return (
        <span onClick={onClick} className="cursor-pointer">
            {children}
        </span>
    )
}