"use client"

import { 
    Card,
    CardContent,
    CardHeader,
    CardFooter,
 } from '@/components/ui/card'
import { Header } from './header'
import { Social } from './social'
import { BackButton } from './_buttons/backbutton'

interface CardWrapperProps{
    children: React.ReactNode,
    headerLabel: string,
    backButtonLabel: string,
    backButtonHref: string,
    showSocial?: boolean,
}

export const CardWrapper=({
    children,
    headerLabel,
    backButtonLabel,
    backButtonHref,
    showSocial
}:CardWrapperProps)=>{
    return (
        <Card className='w-[400px] shadow-md'>
            <CardHeader>
                <Header label={headerLabel}/>
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
            {
                showSocial&& 
                <CardFooter>
                    <Social></Social>
                </CardFooter>
            }

            <CardFooter>
                <BackButton
                href = {backButtonHref}
                label = {backButtonLabel}
                />
            </CardFooter>

        </Card>
    )
}