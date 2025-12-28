'use client'
import { userLogin } from '@/actions/authUser'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { AlertCircleIcon } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'

const Login = () => {
    const [error,setError]=useState<string|undefined>()
    const [isPending,startTransition]=useTransition()
    const session=useSession()
    const router=useRouter()
    if (session.status==="unauthenticated") {
        router.replace('/')
    }
    
    const formAction=async(data:FormData)=>{
        startTransition(async()=>{
            const response=await userLogin(data)
            setError(response?.message)
        })
    }
    return(
        <div className="h-screen flex items-center justify-center flex-col">
            {error&&
            <Alert className='max-w-md w-full p-5 my-4 border-rose-400'>
                <AlertCircleIcon className='text-red-800'/>
                <AlertTitle>{error}</AlertTitle>
            </Alert>
            }
            <form className="w-full max-w-md p-4 lg:p-0 md:p-0" action={formAction}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend className='text-center'>
                            <FieldTitle className='text-md lg:text-[18px] font-semibold'>Welcome Back</FieldTitle>
                        </FieldLegend>
                        <FieldSeparator/>
                        <FieldContent>
                            <FieldGroup>
                                <Field>
                                    <FieldLabel htmlFor='email'>Email</FieldLabel>
                                    <Input name='email' type='email' className='focus-visible:ring-blue-600/75'/>
                                    <FieldError/>
                                </Field>
                                <Field>
                                    <FieldLabel htmlFor='password'>Password</FieldLabel>
                                    <Input name='password' type='password' className='focus-visible:ring-blue-600/75' />
                                </Field>
                            </FieldGroup>
                        </FieldContent>
                    </FieldSet>
                    <FieldGroup>
                        <Field>
                            <Button>{isPending?<><Spinner/>Logging</>:"Login"}</Button>
                        </Field>
                    </FieldGroup>
                    <FieldSeparator/>
                    <FieldGroup className='text-center'>
                        <h2 className='font-semibold'>Don't have an account ?<Link href="/signup" className='text-blue-500 pl-2'>SignUp</Link></h2>
                    </FieldGroup>
                </FieldGroup>
            </form>
        </div>
    )
}

export default Login