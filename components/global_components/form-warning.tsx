import {  MessageCircleWarning } from "lucide-react";


interface FormSuccessProps{
    message?: string,
}

export const FormWarning = ({message}: FormSuccessProps)=> {
    if(!message) return null;
    return (
       <div className="bg-warning/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-warning">
        <MessageCircleWarning className="h-4 w-4"/>
        <p className="text-semibold">{message}</p>
       </div>
    )
}