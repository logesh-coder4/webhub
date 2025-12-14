import { ScrollArea } from '@/components/ui/scroll-area'
import { Home } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const BlogLayout = ({children}:{children:React.ReactNode}) => {
    const links = {
    Blogs:[
        {
        title:"Users",
        url:"/admin/users",
        icon:Home
        },
        {
        title:"Testimonials",
        url:"/",
        icon:Home
        }
    ],
    Api:[
        {
        title:"WebProjects",
        url:"/",
        icon:Home
        },
    ]
}
    return (
        <div className="grid grid-rows-[64px_1fr] h-screen">
            <div className=""></div>
            <div className="flex h-full">
                <aside className="w-1/4 fixed left-0 h-94 z-50">
                    <ScrollArea>
                        {Object.entries(links).map(([key,values],idx)=>(
                            <div className="px-1" key={idx}>
                                <h2 className='font-semibold text-[13px] px-2 text-[#8b8b8b]'>{key}</h2>
                                <div className="py-2 flex flex-col text-sm">
                                    {values.map((value,idx)=><Link href={value.url} key={idx} className='font-semibold w-fit rounded p-2 hover:bg-[#262626]'>{value.title}</Link>)}
                                </div>
                            </div>
                        ))}
                    </ScrollArea>
                </aside>
                <div className="flex-1 ml-80">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default BlogLayout