'use client'
import { resetPasswordAction } from '@/actions/authUser'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const ResetPasswordClient = ({token}:{token:string}) => {
    const router=useRouter()
    const formAction=async(formData:FormData)=>{
        const result=await resetPasswordAction(token,formData)
        if (result instanceof Error) {
         toast.error(result)   
        }else{
            router.replace('/login')
        }
    }
    return (
        <div>
            <form className='h-screen w-full flex items-center justify-center' action={formAction}>
                <Card className='w-full max-w-md dark:bg-zinc-950'>
                    <CardHeader>
                        <CardTitle>Reset Password</CardTitle>
                    </CardHeader>
                    <Separator/>
                    <CardContent>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='password'>Password</FieldLabel>
                                <Input name='password' type='password'/>
                            </Field>
                        </FieldGroup>
                    </CardContent>
                    <CardFooter>
                        <CardAction>
                            <Button>Reset</Button>
                        </CardAction>
                    </CardFooter>
                </Card>     
            </form>

        </div>
    )
}

export default ResetPasswordClient