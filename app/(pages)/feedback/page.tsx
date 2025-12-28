'use client'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { createTestimonial } from '@/dal/testimonial'
import { Testimonials } from '@/lib/generated/prisma/client'
import { FileEdit } from 'lucide-react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

const Feedback = () => {
    const ratings=[
    {
        title:"Outstanding Experience",
        rating:'5'
    },
    {
        title:"Quality work delivered",
        rating:'4'
    },
    {
        title:"Decent Experience",
        rating:'3'
    },
    {
        title:"Could be better",
        rating:'2'
    },
    {
        title:"Poor Experience",
        rating:'1'
    }
    ]
    const session=useSession()
    const router=useRouter()
    if (session.status==="unauthenticated") {
        router.push('/login')
    }
    const [data,setData]=useState<Testimonials>()
    
    const handleSubmit=async ()=>{
        try{
             const testimonial=await createTestimonial(data!)
             if (testimonial.isSuccess) {
                router.push('/')
                toast.success("Feedback submited")
             }
           }catch(error){
            toast.error(error.message)
           }
        }
    
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Card className='max-w-md w-full dark:bg-[#353535] bg-[#eeeeee]'>
                <CardHeader>
                    <CardTitle className='flex gap-2'><FileEdit/> Feedback</CardTitle>
                    <CardDescription>mention your feedback</CardDescription>
                </CardHeader>
                <CardContent>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor='message'>Message</FieldLabel>
                            <Textarea name='message' 
                            onChange={(e)=>setData(prev=>
                            {
                             return {...prev,"message":e.target.value}
                            }
                            )}
                            />
                        </Field>
                        <Field>
                            <FieldLabel htmlFor='ratings'>Ratings</FieldLabel>
                            <Select onValueChange={(rating)=>{
                                setData(prev=>{
                                    return {...prev,"ratings":rating}
                                })
                            }}>
                                    <SelectTrigger>
                                        <SelectValue>Ratings</SelectValue>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {
                                            ratings.map(rating=><SelectItem value={rating.rating} key={rating.rating}>{rating.title}</SelectItem>)
                                        }
                                    </SelectContent>
                            </Select>
                        </Field>
                    </FieldGroup>
                </CardContent>
                <CardFooter>
                    <CardAction>
                        <Button onClick={handleSubmit}>Submit</Button>
                    </CardAction>
                </CardFooter>
            </Card>
        </div>
    )
}

export default Feedback