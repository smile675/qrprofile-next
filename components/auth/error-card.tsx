
import { CardWrapper } from "./card-wrapper";
import {  FaExclamationCircle } from "react-icons/fa";


export const AuthErrorCard = ()=>{
    return (

        <CardWrapper
        headerLabel="Oops! Something went wrong!!"
        backButtonHref="/login"
        backButtonLabel="Back to login"
        >
            <div className="w-full flex justify-center items-center">
            <FaExclamationCircle className="text-destructive text-4xl"/>
            </div>
        </CardWrapper>
    )
}