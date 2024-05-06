"use server"

import {signOut} from "@/auth"

export const logOut = async ()=>{
    await signOut(
        {
            redirectTo: "/",
            redirect: true,
        }
    );
    
}