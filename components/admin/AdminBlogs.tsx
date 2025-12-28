'use client'
import { Activity, useState } from 'react'
import { CustomTable } from './data-table'
import { Blog } from '@/lib/generated/prisma/client'
import { blogColumns } from './columns'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { blogFields } from '@/lib/inputFields'
import { deleteBlog, updateBlog } from '@/dal/admin.dal'

const AdminBlogs = ({data}:{data:Blog[]}) => {
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [updateData,setUpdateData]=useState<Blog>()

    const handleDelete=async()=>{
        const blog=await deleteBlog(id!)
        toast.success(blog.title)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Blog) => {
        const blog=await updateBlog(id!,rawData)
        setUpdateData(blog!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Blog> data={data} columns={blogColumns({setId,setOperation,setUpdateData})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Blog> handleClose={handleClose} handleUpdate={handleUpdate} rawData={updateData!} fields={blogFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminBlogs