import * as z from "zod"

export const NewPasswordSchema = z.object({
    password: z.string().min(6,{
        message: "Minimum 6 characters required"
    }),
});


export const PasswordResetSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
});

export const LoginSchema = z.object({
    email: z.string().email({
        message: "Email is required"
    }),
    password: z.string().min(1, {
        message: "Password is required"
    }),
    twoFCode: z.optional(z.string())
});

export const RegisterSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6, {
        message: "Minimum 6 characters required"
    }),
    name: z.string().min(1,{
        message: "Name is required"
    })
});

export const ProfileUpdateSchema = z.object({
    name: z.optional(z.string()),
    email: z.optional(z.string().email()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    password:z.optional(z.string().min(6)),
    newPassword:z.optional(z.string().min(6)),
}).refine((data)=>{
    if(data.password && !data.newPassword){
        return false
    }
    return true
}, {
    message: "New password is required",
    path: ["newPassword"],
}).refine((data)=>{
    if (data.newPassword && !data.password){
        return false
    }
    return true
}, {
    message: "Current Password is required",
    path: ["password"],

})