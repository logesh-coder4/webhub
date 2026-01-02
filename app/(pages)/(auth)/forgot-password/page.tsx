'use client'
import { forgotPasswordAction } from '@/actions/authUser'
import { Button } from '@/components/ui/button'
import { FieldGroup,FieldLabel,FieldTitle,FieldSeparator,FieldSet,Field,FieldLegend } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const ForgotPassword = () => {
    const formAction=async(formData:FormData)=>{
        const result=await forgotPasswordAction(formData)
        if (result.isSuccess) {
            toast.success(result.message)
        }else{
        toast.error(result)}
    }
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <form className='max-w-md w-full border px-4 py-4 rounded' action={formAction}>
                <FieldGroup>
                    <FieldSet>
                        <FieldLegend>
                            <FieldTitle>Forgot Password</FieldTitle>
                        </FieldLegend>
                        <FieldSeparator/>
                        <FieldGroup>
                            <Field>
                                <FieldLabel htmlFor='email'>Email</FieldLabel>
                                <Input name="email"/>
                            </Field>
                        </FieldGroup>
                        <FieldGroup>
                            <Button>Reset Password</Button>
                        </FieldGroup>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    )
}

export default ForgotPassword