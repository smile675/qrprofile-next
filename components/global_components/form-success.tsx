import { CheckCircle } from "lucide-react";
import { FaExclamationCircle } from "react-icons/fa";

interface FormSuccessProps{
    message?: string,
}

export const FormSuccess = ({message}: FormSuccessProps)=> {
    if(!message) return null;
    return (
       <div className="bg-primary/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-primary">
        <CheckCircle className="h-4 w-4"/>
        <p>{message}</p>
       </div>
    )
}