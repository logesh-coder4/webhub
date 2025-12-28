import AdminTestimonials from '@/components/admin/AdminTestimonials'
import { getAllTestimonials } from '@/data/admin'
import { connection } from 'next/server'

const AdminTestimonialPage = async() => {
    await connection()
    const data=await getAllTestimonials()
    return (
        <div className="">
            <AdminTestimonials data={data}/>
        </div>
    )
}

export default AdminTestimonialPage