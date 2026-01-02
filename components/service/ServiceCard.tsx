'use client'
import { useRouter } from "next/navigation"
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { ServiceType } from '@/lib/types'

const ServiceCard=({service,projectType}:{service:ServiceType,projectType:string})=>{
    const router=useRouter()
    
    return(
        <Card className='hover:scale-105 max-w-md w-full' onClick={()=>router.push(`/create-project?type=${projectType}&service=${service.query}`)}>
            <CardHeader className=''>
                <CardTitle className='flex gap-2'>{service.icon}{service.name}</CardTitle>
                <CardDescription className='text-foreground'>{service.description}</CardDescription>
            </CardHeader>
        </Card>
    )
}

export default ServiceCard