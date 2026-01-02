"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Computer, Factory, Layers, Phone } from "lucide-react";
type Point={
    title:string,
    points:string[]
}

type Offers={
    title:string
    description:string
    icon:React.ReactNode
    points:Point[]
}

const WhatWeOffer=()=>{
    const offers:Offers[]=[
        {
            title:"Frontend Development",
            icon:<Computer/>,
            description:"We help you build modern, fast, and responsive frontend applications based on your needs.",
            points:[
                {
                    title:"Create a complete frontend application",
                    points:["Build user interfaces using React / Next.js","Modern layouts, clean design, responsive on all devices"]
                },
                {
                title:"Integrate frontend with backend APIs",
                points:["Connect with your existing backend","Handle authentication, data fetching, forms, and dashboards"]  
                },
                {
                    title:"Static website development",
                    points:["Landing pages","Company websites","Portfolio sites","SEO-friendly static pages"]
                },
                {
                    title:"UI improvements & redesign",
                    points:["Improve existing UI","Fix layout issues","Enhance user experience"]
                }
            ]
        },
        {
            title:"Backend Development",
            description:"Build powerful, secure, and scalable backend systems.",
            icon:<Factory/>,
            points:[{
                title:"What we provide",
                points:["API development (REST / GraphQL)","Database design & integration","Authentication & authorization","Business logic implementation","Performance optimization"]
            }]
        },
        {
            title:"Full-Stack Development",
            description:"Complete end-to-end application development.",
            icon:<Layers/>,
            points:[{
                title:"Includes",
                points:["Frontend + backend development","Database integration","Authentication & user roles","Deployment & environment setup","Ongoing improvements"]
            }]
        },
        {
            title:"Mobile App Development",
            icon:<Phone/>,
            description:"Cross-platform mobile solutions.",
            points:[{
                title:"You can build",
                points:["Android & iOS apps","Android & iOS apps","Admin dashboards","Performance-optimized mobile UI"]
            }]
        },
        {
            title:"API Development",
            description:"Robust APIs for your applications.",
            icon:<Factory/>,
            points:[{
                title:"We handle",
                points:["REST / GraphQL API design","Secure endpoints","Third-party integrations","API testing & documentation"]
            }]
        },
    ]
    return(
        <div className="flex flex-col p-10 md:p-0 lg:p-0 md:grid lg:grid md:grid-cols-2 lg:grid-cols-2 gap-x-10 gap-y-5">
            {offers.map((offer,idx)=>(
                <div key={idx}>
                    <Accordion type="single" className="w-full" defaultValue={offer.title} collapsible>
                        <AccordionItem value={offer.title}>
                            <AccordionTrigger>{offer.title}</AccordionTrigger>
                            <AccordionContent>
                                {offer.points.map((point,idx)=>(
                                    <div key={idx}>
                                        <h2 className="text-start text-[16px] font-bold py-4">{point.title}</h2>
                                        <ul className="space-y-3 px-2">
                                        {point.points.map((p,idx)=>(
                                            <li key={idx} className="flex gap-x-2">
                                                <CheckCircle size={18} className="text-blue-500 mt-0.5"/>
                                                <span className="text-gray-700 dark:text-gray-400 font-stretch-ultra-expanded font-semibold">{p}</span>
                                            </li>
                                        ))}
                                        </ul>
                                    </div>
                                ))}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            ))}
        </div>
    )
}

export default WhatWeOffer