import AdminOtherProject from '@/components/admin/AdminOtherProjects'
import { getAllOtherProjects } from '@/data/admin'
import { connection } from 'next/server'

const AdminOtherProjectPage = async() => {
    await connection()
    const data=await getAllOtherProjects()
    return (
        <div className="">
            <AdminOtherProject data={data}/>
        </div>
    )
}

export default AdminOtherProjectPage