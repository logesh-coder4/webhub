'use client'
import { checkProjectUser } from '@/actions/utils'
import ProjectSidebar from '@/components/ProjectSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useSession } from 'next-auth/react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { toast } from 'sonner'

const ProjectLayout = ({children}:{children:React.ReactNode}) => {
    const {key}=useParams()
    const searchParams=useSearchParams()
    const session=useSession()
    const projectType=searchParams.get("type") as "web"|"others"
    const router=useRouter()
    useEffect(()=>{
        const checkValidUser=async()=>{
            const checkValidUser=await checkProjectUser(key as string,projectType)
            if (!checkValidUser) {
                toast.error("Invalid secreat key")
                router.push('/')
            }
        }
        checkValidUser()
    },[session,key,projectType])
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