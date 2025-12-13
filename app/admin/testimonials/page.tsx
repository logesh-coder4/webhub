'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../data-table'
import { Testimonials } from '@/lib/generated/prisma/client'
import { testimonialsColumns, userColumns } from '../columns'
import { getAllTestimonials, getTestimonial } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { testimonialsFields } from '@/lib/inputFields'
import { deleteTestimonial, updateTestimonial } from '@/dal/admin.dal'

const AdminTestimonials = () => {
    const [data,setData]=useState<Testimonials[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [testimonial,setTestimonial]=useState<Testimonials>()
    useEffect(()=>{
        const fetchData=async()=>{
            const testimonials=await getAllTestimonials()
            setData(testimonials)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const testimonial=await getTestimonial(id!)
            setTestimonial(testimonial!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const testimonial=await deleteTestimonial(id!)
        toast.success(testimonial.message)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Testimonials) => {
        const testimonial=await updateTestimonial(id!,rawData)
        setTestimonial(testimonial!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Testimonials> data={data} columns={testimonialsColumns({setId,setOperation})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Testimonials> handleClose={handleClose} handleUpdate={handleUpdate} rawData={testimonial!} fields={testimonialsFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminTestimonials