"use client"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { UserButton } from "@/components/auth/_buttons/user-button"

 export const  ProfileNav = ()=>{
    const path = usePathname()

    const profileRoute = {
        profile : "/profile",
        server: "/server",
        client: "/client",
        pro: "/pro"
    }
    return (
        <nav className="bg-secondary w-full p-2 h-16 flex justify-center items-center shadow-sm gap-2">

            <Button asChild
            variant={path === profileRoute.profile? "default": "outline"}
            >
                <Link href={profileRoute.profile}>Profile</Link>
            </Button>
            <Button asChild
            variant={path === profileRoute.server? "default": "outline"}
            >
                <Link href={profileRoute.server}>Server</Link>
            </Button>
            <Button asChild
            variant={path === profileRoute.client? "default": "outline"}
            >
                <Link href={profileRoute.client}>Client</Link>
            </Button>
            <Button asChild
            variant={path === profileRoute.pro? "default": "outline"}
            >
                <Link href={profileRoute.pro}>Pro</Link>
            </Button>

            <UserButton/>

        </nav>
    )
}