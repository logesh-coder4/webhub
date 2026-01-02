import { auth } from '@/auth'
import { CreateMentorProjectForm, CreateOtherProjectForm, CreateWebProjectForm } from '@/components/CreateProjectForm'
import { otherServices, webServices } from '@/lib/constants'
import { OtherServices, WebServices } from '@/lib/generated/prisma/enums'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

type SearchParams={
  type:"web"|"others",
  service:WebServices|OtherServices|null
}

interface Props{
  params?:Promise<{}>
  searchParams:Promise<SearchParams>
}

export const metadata:Metadata={
    title:"Create Project",
    description:"Start a new project by defining your requirements, selecting services, and turning your idea into reality."
}

const CreateProject = async({searchParams}:Props) => {
    const {type:projectType,service}=await searchParams
    const session=await auth()
    if (!session?.user) {
        redirect('/login')
    }
    if (projectType==="web") {
        if (!webServices.includes(service!)) {
            redirect('/')
        }
    }else if(projectType==="others"){
        if (!otherServices.includes(service!)) {
            redirect('/')
        }
    }
  return (
    <div className='min-h-screen h-full w-full flex items-center justify-center mt-20 mb-10'>
        {projectType==="web"&&<CreateWebProjectForm service={service}/>}
        {projectType==="others"&&(service==="mentorship"||service==="learner"?<CreateMentorProjectForm service={service}/>:<CreateOtherProjectForm service={service}/>)}
    </div>
  )
}

export default CreateProject