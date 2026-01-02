import ProjectSidebar from '@/components/ProjectSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

interface Props{
    children:React.ReactNode
}

const ProjectLayout = ({children}:Props) => {
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