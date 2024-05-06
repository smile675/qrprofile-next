"use server"

import {signOut} from "@/auth"

export const logOut = async ()=>{
    await signOut(
        {
            /**
             without this one problem happen
             for example:
             when log out from /profile; by setup in middleware.ts without user should redirect to /login
             because /profile is not valid if user not logged in so it should display login.
             without this route correctly redirecting to /login but in the url it shows /profile.
             on refresh, url correct itself.
             now with redirectTo and redirect:true middleware does not have a chance to execute logic
             because user is redirecting to a public route.
             anyway, stil if somebody give url "/profile" without logged in, middleware will send him to /login

            */ 

            redirectTo: "/",
            redirect: true,
        }
    );
    
}