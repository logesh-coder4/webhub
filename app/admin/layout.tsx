'use client'
import AdminSidebar from '@/components/AdminSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'

const AdminLayout = ({children}:{children:React.ReactNode}) => {
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