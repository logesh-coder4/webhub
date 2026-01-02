'use client'
import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import Link from 'next/link'
import { toast } from 'sonner'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, SignUpType } from '@/dto/auth.dto'
import { registerUser } from '@/actions/authUser'
import { userProfessions } from '@/lib/constants'
import { UserProfession } from '@/lib/generated/prisma/enums'
import { Spinner } from '@/components/ui/spinner'
import { useTransition } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const SignUp = () => {
    const [isPending,startTransition]=useTransition()
    const {formState:{errors},register,handleSubmit,setValue}=useForm({
        mode:"onChange",
        defaultValues:{},
        resolver:zodResolver(SignUpSchema),
    })
    const session=useSession()
    const router=useRouter()
    if (session.status==="authenticated") {
        router.replace('/')
    }
    const handleClick=async(data:SignUpType)=>{
        startTransition(async()=>{
            const response=await registerUser(data)
            if (response.error) {
                toast.error(response.error.message)
            }else{
            toast.success("Verification email has been sent to your registered email address")}
        })
    }
    return(
        <div className="flex items-center justify-center h-[120vh] md:h-[135vh] lg:h-[135vh]">
            <form className="w-full max-w-md p-4 lg:p-0 md:p-0" action={handleSubmit(handleClick)}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend className='text-center'>
                            <FieldTitle className='text-md lg:text-[18px] font-semibold'>Create WebHub Account</FieldTitle>
                        </FieldLegend>
                        <FieldSeparator/>
                        <FieldContent>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                                    <Input type='email' className='focus-visible:ring-blue-600/75' {...register("email")}/>
                                    <FieldError>{errors.email?.message}</FieldError>
                                </Field>
                                <FieldGroup>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Field>
                                            <FieldLabel htmlFor='username'>Username</FieldLabel>
                                            <Input type='text' className='focus-visible:ring-blue-600/75' {...register("username")}/>
                                            <FieldError>{errors.username?.message}</FieldError>
                                        </Field>
                                        <Field>
                                            <FieldLabel>Profession</FieldLabel>
                                                <Select {...register("profession")} onValueChange={(data)=>setValue("profession",data as UserProfession)}>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Select a profession" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            <SelectLabel>Profession</SelectLabel>
                                                            {userProfessions.map((profession,idx)=><SelectItem key={idx} value={profession}>{profession}</SelectItem>)}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                                <FieldError>{errors.profession?.message}</FieldError>
                                            <FieldError/>
                                        </Field>
                                    </div>
                                </FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                                    <Input type='password' className='focus-visible:ring-blue-600/75' {...register("password")}/>
                                    <FieldError>{errors.password?.message}</FieldError>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor='confirmPassword'>Confirm Password</FieldLabel>
                                    <Input type='password' {...register("confirmPassword")} className='focus-visible:ring-blue-600/75' />
                                    <FieldError>{errors.confirmPassword?.message}</FieldError>
                                </Field>
                            </FieldGroup>
                        </FieldContent>
                    </FieldSet>
                    <FieldGroup>
                        <Field>
                            {isPending?<Button disabled><Spinner/>Registering....</Button>:<Button>SignUp</Button>}
                        </Field>
                    </FieldGroup>
                    <FieldSeparator/>
                    <FieldGroup className='text-center'>
                        <h2 className='font-semibold'>Do you have an account ?<Link href="/login" className='text-blue-500 pl-2'>Login</Link></h2>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </div>
    )
}

export default SignUp