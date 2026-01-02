import { projectIsverified } from '@/actions/projectActions'
import { checkProjectUser } from '@/actions/utils'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2 } from 'lucide-react'
import { redirect } from 'next/navigation'

interface Props{
    params:Promise<{key:string}>
    searchParams:Promise<{type:"web"|"others"}>
}

const ProjectArea = async({params,searchParams}:Props) => {
    const {key}=await params
    const {type}=await searchParams
    const isValidUser=await checkProjectUser(key,type)
    if (!isValidUser){
        redirect('/')
    }
    const isVerified=await projectIsverified(key,type)
    return (
        <div className='h-screen w-full flex items-center justify-center'>
            <Card className='w-full max-w-2xs border-2 shadow-lg border-stone-300 dark:border-neutral-700'>
                <CardHeader>
                    <CardTitle className='text-center'>{isVerified?"Verified":"Wait for approval"}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    {isVerified?<CheckCircle2 className='text-emerald-500'/>:<Spinner className='size-8 text-blue-600'/>}
                </CardContent>
            </Card>
        </div>
    )
}

export default ProjectArea