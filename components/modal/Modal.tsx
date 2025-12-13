import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { IconUpload } from '@tabler/icons-react'
import { InputFieldType } from '@/lib/inputFields'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

interface DeleteProps{
    handleDelete:()=>void
    handleClose:()=>void
}

interface UpdateProps<T>{
    rawData:T
    handleUpdate:(data:T)=>void
    handleClose:()=>void
    fields:InputFieldType[]
}

const ModalOverlay=({children}:{children:React.ReactNode})=>{
    return(
        <div className="h-screen w-full fixed top-0 left-0 bg-neutral-950/50 dark:bg-zinc-400/40 flex items-center justify-center z-50">
            {children}
        </div>
    )
}

export const DeleteModal = ({handleDelete,handleClose}:DeleteProps) => {
    return (
        <ModalOverlay>
            <Card className='max-w-md w-full'>
                <CardHeader>
                    <CardTitle>Are You Sure Want To Delete?</CardTitle>
                    <CardDescription>If you delete permentely the data the data is no longer available</CardDescription>
                </CardHeader>
                <CardFooter className='gap-2'>
                    <Button onClick={handleDelete} className='bg-red-600/90 text-white'><Trash className='text-white'/>Delete</Button>
                    <Button onClick={handleClose}>Cancel</Button>
                </CardFooter>
            </Card>
        </ModalOverlay>  
    )
}

export const UpdateModal = <T,>({handleUpdate,handleClose,rawData,fields}:UpdateProps<T>) => {
    const [data,setData]=useState<T>()
    useEffect(()=>{
        setData(rawData)
    },[rawData])
    return (
        <ModalOverlay>
            <Card className='max-w-md w-full'>
                <ScrollArea className='h-[70vh]'>
                    <CardHeader>
                        <CardTitle>Are You Sure Want To Update?</CardTitle>
                        <CardDescription>the data is updated</CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-4 p-2'>
                        {fields.map((field,idx)=>{
                            return(
                                <div className="" key={idx}>
                                    <Label htmlFor={field.name}>{field.title}</Label>
                                    <Input name={field.name} value={data?data[field.name]:""} onChange={(e)=>{
                                        setData((prev:any)=>
                                        {
                                            return{...prev,[field.name]:e.target.value}
                                        })
                                    }}/>
                                </div>
                            )
                        })}
                    </CardContent>
                    <CardFooter className='gap-2 p-2'>
                        <Button onClick={()=>{
                            handleUpdate(data!)
                        }}><IconUpload className='text-white'/>Update</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </CardFooter>
                </ScrollArea>
            </Card>
        </ModalOverlay>  
    )
}

export default DeleteModal