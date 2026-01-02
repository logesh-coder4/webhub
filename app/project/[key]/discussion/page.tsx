import { projectIsverified } from '@/actions/projectActions'
import { checkProjectUser } from '@/actions/utils'
import ChatClient from '@/components/ChatClient'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Spinner } from '@/components/ui/spinner'
import { CheckCircle2 } from 'lucide-react'
import { redirect } from 'next/navigation'

interface Props{
    children:React.ReactNode
    params:Promise<{key:string}>
    searchParams:Promise<{type:"web"|"others"}>
}

const ProjectDetails = async({params,searchParams}:Props) => {
    const {key}=await params
    const {type:projectType}=await searchParams
    const isProjectVerified=await projectIsverified(key!,projectType)
    
    const isValidUser=await checkProjectUser(key,projectType)
    if (!isValidUser){
        redirect('/')
    }
    if (!isProjectVerified) {
        return (<div className='h-screen w-full flex items-center justify-center'>
            <Card className='w-full max-w-2xs border-2 shadow-lg border-stone-300 dark:border-neutral-700'>
                <CardHeader>
                    <CardTitle className='text-center'>{isProjectVerified?"Verified":"Wait for approval"}</CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                    {isProjectVerified?<CheckCircle2 className='text-emerald-500'/>:<Spinner className='size-8 text-blue-600'/>}
                </CardContent>
            </Card>
        </div>)
    }

    return (
        <div className='h-[93vh]'>
            <ChatClient/>
        </div>
    )
}

export default ProjectDetails