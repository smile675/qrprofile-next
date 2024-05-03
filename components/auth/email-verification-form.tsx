"use client"

import { CardWrapper } from "./card-wrapper"
import {BeatLoader} from "react-spinners"
import { emailVerification } from "@/actions/emailVerification"

import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { FormError } from "../global_components/form-error"
import { FormSuccess } from "../global_components/form-success"


export const EmailVerificationForm = ()=>{
    
    const [error, setError] = useState<string | undefined>();
    const [success, setSuccess] = useState<string | undefined>();

    const searchParams = useSearchParams();
    const token  = searchParams.get("token");

    const onSubmit = useCallback(()=>{
        if(success || error) return;

        if(!token) {
            setError("Verification oken not found!")
            return;
        };
        emailVerification(token)
        .then((data)=>{
            setSuccess(data.success);
            setError(data.error);
        })
        .catch(()=>{
            setError("Unknow error occured!")
        })
        ;
    },[token, success, error]);

    useEffect(()=>{
        onSubmit();
    }, [onSubmit]);


    return (
        <CardWrapper
        headerLabel="Confirming your verification"
        backButtonHref="/login"
        backButtonLabel="Back to login">
            <div className="flex items-center w-full justify-center">
                {!success && !error && (
                    <BeatLoader/>
                )}
                {!success && (<FormError message={error}/>)}
                <FormSuccess message = {success}/>

            </div>
        </CardWrapper>
    )
}