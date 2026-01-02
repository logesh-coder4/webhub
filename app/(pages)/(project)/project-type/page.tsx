import { auth } from '@/auth'
import ProjectTypeCard from '@/components/ProjectTypeCard'
import { Globe } from 'lucide-react'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'


export const metadata:Metadata={
    title:"Project Type",
    description:"Select the type of project you want to build, including frontend, backend, full-stack, mobile apps, or other services."
}

const ProjectType = async() => {
    await new Promise(res=>setTimeout(res,5000))
    const session=await auth()
    if (!session?.user) {
        redirect('/login')
    }
    const types=[
        {title:"Web Project",description:"Build your own web, mobile, or full-stack applications with integrated API, testing, and utility support — everything you need to bring your digital ideas to life.",icon:<Globe/>,path:'web'},
        {title:"Other Project",description:"Get personalized mentorship, project guidance, or freelance collaboration to accelerate your learning and complete your projects with expert help.",icon:<Globe/>,path:"others"}
    ]
    return (
        <div className="h-screen w-full flex items-center justify-center flex-col gap-4 md:flex-row lg:flex-row p-3 md:p-0 lg:p-0">
            {types.map((pType,idx)=>(
                <ProjectTypeCard key={idx} pType={pType}/>
            ))}
        </div>
    )
}

export default ProjectType