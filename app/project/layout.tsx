'use client'
import ProjectSidebar from '@/components/ProjectSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useParams, useSearchParams } from 'next/navigation'

const ProjectLayout = ({children}:{children:React.ReactNode}) => {
    const {key}=useParams()
    const searchParams=useSearchParams()
    const projectType=searchParams.get("type")
    return (
        <div>
            <SidebarProvider>
                <ProjectSidebar secreatKey={key} projectType={projectType!}/>
                <main className='w-full'>
                    <SidebarTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default ProjectLayout