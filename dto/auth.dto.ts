import z from "zod";

export const SignUpSchema=z.object({
    username:z.string().min(3,'Username contains atleast 4 chars'),
    email:z.email(),
    password:z.string()
    .min(8,'Password must be greater than 8 characters')
    .max(18,'Password must be less than 18 chars')
    .regex(/[A-Z]/,'Contains atleast one uppercase letter')
    .regex(/[a-z]/,'Contains atleast one lowercase letter')
    .regex(/[0-9]/,'Contains atleast one number')
    .regex(/[^A-Za-z0-9]/,'Contains atleast one spcial character'),
    confirmPassword:z.string(),
}).refine(
    (data)=>data.password===data.confirmPassword,
    {error:"Password do not match",path:["confirmPassword"]}
)


export type SignUpType=z.infer<typeof SignUpSchema>