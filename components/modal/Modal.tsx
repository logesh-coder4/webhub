import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import { Trash } from 'lucide-react'
import { ScrollArea } from '../ui/scroll-area'
import { IconUpload } from '@tabler/icons-react'
import { InputFieldType } from '@/lib/inputFields'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Textarea } from '../ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

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

type FieldProps={
    type:string
    inputType:string
    name:string
    title:string
    options:any[]
}

const ModalField=
    ({field,data,setData}:
    {field:FieldProps,
        data:any,
        setData:Dispatch<SetStateAction<any>>
    })=>{
    return(
        <>
            {
                field.type==="input"?(
                    <div className="space-y-2 col-span-12 md:col-span-6">
                        <Label htmlFor={field.name}>{field.title}</Label>
                        <Input name={field.name} type={field.inputType} value={data&&data[field.name]?data[field.name]:""} onChange={(e)=>{
                            const value=field.inputType==="number"?Number(e.target.value):e.target.value
                            setData((prev:any)=>
                            {
                                return{...prev,[field.name]:value}
                            })
                        }}/>
                    </div>
                ):field.type==="fullInput"?(
                    <div className="space-y-2 col-span-12">
                        <Label htmlFor={field.name}>{field.title}</Label>
                        <Input name={field.name} type={field.inputType}  value={data?data[field.name]:""} onChange={(e)=>{
                            const value=field.inputType==="number"?Number(e.target.value):e.target.value
                            setData((prev:any)=>
                            {
                                return{...prev,[field.name]:value}
                            })
                        }}/>
                    </div>
                ):field.type==="checkbox"?(
                    <div className="flex items-center justify-center space-x-2 col-span-12 md:col-span-4">
                        <Label htmlFor={field.name}>{field.title}</Label>
                        <Checkbox name={field.name} checked={data&&data[field.name]&&data[field.name]} onCheckedChange={(d)=>{
                            setData((prev:any)=>
                            {
                                return{...prev,[field.name]:d}
                            })
                        }}/>
                    </div>
                ):field.type==="textarea"?(
                    <div className="space-y-2 col-span-12">
                        <Label htmlFor={field.name}>{field.title}</Label>
                        <Textarea name={field.name} value={data?data[field.name]:""} onChange={(e)=>{
                            setData((prev:any)=>
                            {
                                return{...prev,[field.name]:e.target.value}
                            })
                        }}/>
                    </div>
                ):field.type==="select"?(
                <div className="space-y-2 col-span-12 md:col-span-4 ">
                    <Label htmlFor={field.name}>{field.title}</Label>
                    <Select value={data&&data[field.name]&&data[field.name]} onValueChange={(data)=>{setData((prev:any)=>
                            {
                                return{...prev,[field.name]:data}
                            })}}>
                        <SelectTrigger id={field.name} className='w-full'>
                            <SelectValue placeholder={field.title} />
                        </SelectTrigger>
                        <SelectContent>
                        {field.options.map((option,idx)=>(
                            <SelectItem key={idx} value={option}>{option}</SelectItem>
                        ))}
                        </SelectContent>
                    </Select>
                </div>
                ):<></>
            }
        </>
    )
}

export const UpdateModal = <T,>({handleUpdate,handleClose,rawData,fields}:UpdateProps<T>) => {
    const [data,setData]=useState<T>()
    useEffect(()=>{
        setData(rawData)
    },[rawData])
    return (
        <ModalOverlay>
            <Card className='max-w-2xl w-full'>
                <CardHeader>
                    <CardTitle>Are You Sure Want To Update?</CardTitle>
                    <CardDescription>the data is updated</CardDescription>
                </CardHeader>
                <ScrollArea className='h-[40vh]'>
                    <CardContent className='space-y-4 p-2 grid grid-cols-12 gap-3'>
                        {fields.map((field,idx)=>{
                            return(
                                <ModalField key={idx} field={field} data={data} setData={setData} />
                            )
                        })}
                    </CardContent>
                </ScrollArea>
                <CardFooter className='gap-2 p-2'>
                    <Button onClick={()=>{
                        handleUpdate(data!)
                    }}><IconUpload className='text-text'/>Update</Button>
                    <Button onClick={handleClose} variant="outline">Cancel</Button>
                </CardFooter>
            </Card>
        </ModalOverlay>  
    )
}

export default DeleteModal