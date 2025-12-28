import { auth } from '@/auth'
import AdminSidebar from '@/components/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { redirect } from 'next/navigation'

const AdminLayout = async({children}:{children:React.ReactNode}) => {
    const session=await auth()
    if (session?.user) {
        if (!session?.user.isSuperUser) {
            redirect('/404')
        }
    }else{
        redirect('/login')
    }
    return (
        <div>
            <SidebarProvider>
                <AdminSidebar/>
                <main className='w-full'>
                    <SidebarTrigger/>
                    {children}
                </main>
            </SidebarProvider>
        </div>
    )
}

export default AdminLayout