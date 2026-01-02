import AdminBlogs from '@/components/admin/AdminBlogs'
import { getAllBlogs } from '@/data/admin'
import { connection } from 'next/server'

const AdminBlogPage = async() => {
    await connection()
    const data=await getAllBlogs()
    return (
        <div>
            <AdminBlogs data={data}/>
        </div>
    )
}

export default AdminBlogPage