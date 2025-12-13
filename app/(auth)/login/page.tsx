import { userLogin } from '@/actions/authUser'
import { Button } from '@/components/ui/button'
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel, FieldLegend, FieldSeparator, FieldSet, FieldTitle } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import Link from 'next/link'

const Login = () => {
    return(
        <div className="h-screen flex items-center justify-center">
            <form className="w-full max-w-md p-4 lg:p-0 md:p-0" action={userLogin}>
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
                                    <FieldError />
                                </Field>
                            </FieldGroup>
                        </FieldContent>
                    </FieldSet>
                    <FieldGroup>
                        <Field>
                            <Button>Login</Button>
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