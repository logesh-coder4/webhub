'use client'
import { Activity, useEffect, useState } from 'react'
import { CustomTable } from '../../data-table'
import { Message } from '@/lib/generated/prisma/client'
import { messagesColumns } from '../../columns'
import { getAllMessages, getMessage } from '@/data/admin'
import DeleteModal, { UpdateModal } from '@/components/modal/Modal'
import { toast } from 'sonner'
import { messageInputFields } from '@/lib/inputFields'
import { deleteMessage, updateMessage } from '@/dal/admin.dal'

const AdminMessages = () => {
    const [data,setData]=useState<Message[]>([])
    const [id,setId]=useState<number|null>(null)
    const [operation,setOperation]=useState<"delete"|"update"|null>(null)
    const [message,setMessage]=useState<Message>()
    useEffect(()=>{
        const fetchData=async()=>{
            const messages=await getAllMessages()
            setData(messages)
        }
        fetchData()
    },[id,operation])

    useEffect(()=>{
        const fetchData=async () => {
            const message=await getMessage(id!)
            setMessage(message!)
        }
        if (id)fetchData() 
    },[id,operation])

    const handleDelete=async()=>{
        const message=await deleteMessage(id!)
        toast.success(message.text)
        setOperation(null)
        setId(null)
    }
    const handleClose=()=>{
        setOperation(null)
        setId(null)
    }
    const handleUpdate=async(rawData:Message) => {
        const message=await updateMessage(id!,rawData)
        setMessage(message!)
        setOperation(null)
        setId(null)
    }
    return (
        <div>
            <CustomTable<Message> data={data} columns={messagesColumns({setId,setOperation})} filterName='id'/>
            <Activity mode={id?"visible":"hidden"}>
                <Activity mode={operation==="update"?"visible":"hidden"}>
                    <UpdateModal<Message> handleClose={handleClose} handleUpdate={handleUpdate} rawData={message!} fields={messageInputFields}/>
                </Activity>
                <Activity mode={operation==="delete"?"visible":"hidden"}>
                    <DeleteModal handleClose={handleClose} handleDelete={handleDelete}/>
                </Activity>
            </Activity>
        </div>
    )
}

export default AdminMessages