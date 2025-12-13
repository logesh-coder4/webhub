'use client'
import ProjectSidebar from '@/components/ProjectSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const ProjectLayout = ({children}:{children:React.ReactNode}) => {
    return (
        <div>
            <SidebarProvider>
                <ProjectSidebar/>
                <main className='w-full'>
                    <SidebarTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default ProjectLayout