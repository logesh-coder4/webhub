'use client'
import { CreateMentorProjectForm, CreateOtherProjectForm, CreateWebProjectForm } from '@/components/CreateProjectForm'
import { otherServices, webServices } from '@/lib/constants'
import { OtherServices, WebServices } from '@/lib/generated/prisma/enums'
import { useSearchParams } from 'next/navigation'

const CreateProject = () => {
  const searchParams=useSearchParams()
  const projectType=searchParams.get('type')
  const service=searchParams.get('service') as  WebServices|OtherServices|null

  if (projectType==="web") {
      if (!webServices.includes(service!)) {
          return
      }
  }else if(projectType==="others"){
      if (!otherServices.includes(service!)) {
          return
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