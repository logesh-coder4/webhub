'use client'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Globe } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const ProjectType = () => {
    const router=useRouter()
    const types=[
        {title:"Web Project",description:"Build your own web, mobile, or full-stack applications with integrated API, testing, and utility support — everything you need to bring your digital ideas to life.",icon:<Globe/>,path:'web'},
        {title:"Other Project",description:"Get personalized mentorship, project guidance, or freelance collaboration to accelerate your learning and complete your projects with expert help.",icon:<Globe/>,path:"others"}
    ]
    const session=useSession()
    if (session.status==="unauthenticated") {
        router.replace('/')
    }
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-4 md:flex-row lg:flex-row p-3 md:p-0 lg:p-0">
            {types.map((pType,idx)=>(
                <Card key={idx} className='dark:bg-zinc-900/50 bg-zinc-300/50 hover:scale-105 max-w-md w-full' onClick={()=>router.push(`/select-service?type=${pType.path}`)}>
                    <CardHeader className=''>
                        <CardTitle className='flex gap-2'>{pType.icon}{pType.title}</CardTitle>
                        <CardDescription className='text-foreground'>{pType.description}</CardDescription>
                    </CardHeader>
                </Card>
            ))}
        </div>
    )
}

export default ProjectType