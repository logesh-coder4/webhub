"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import { CheckCircle, ChevronDown, Computer, Dot, Factory, Layers, Phone, Star } from "lucide-react";
import { motion } from "motion/react";
import { useRouter } from "next/navigation";

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

const ServicesPage = () => {
    const works=["Review Your Plan","NDA & Confidentiality","Project Analysis",'Development Phase',"Testing & Scaling","HandOver & Support"]
    const router=useRouter()
    return (
        <motion.div className="bg-gray-50 dark:bg-[#0d0d0f]">
            <div className="max-w-6xl mx-auto px-6 h-screen flex items-center justify-center flex-col">
                <div className="text-center mb-14">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                        Services That Turn Idea Into <span className="text-indigo-600">Real Product</span>
                    </h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                        from websites and mobile apps to full stack systems and mentorship -we support you at every step 
                    </p>
                </div>
                <div className="flex items-center justify-center gap-5 flex-col md:flex-row lg:flex-row">
                    <Button size="lg" onClick={()=>router.push('/select-service?type=web')}>Create Project</Button>
                    <Button size="lg" variant="outline" onClick={()=>router.push('/select-service?type=web')}>Book Mentorship</Button>
                </div>
            </div>
            <div className="text-center mb-14 mt-10">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    What We <span className="text-pink-600">Offer</span>
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    From development to mentorship — all services in one place.
                </p>
                <div className="max-w-4xl mx-auto my-20">
                    <WhatWeOffer/>
                </div>
            </div>
            <div className="text-center my-20">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                    How <span className="text-blue-600">We Works</span>
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                    A transparent workflow designed for collaboration and success.
                </p>
                <div className="py-10">
                    {works.map((work,idx)=>(
                        <motion.div className="flex items-center justify-center flex-col" 
                            key={idx} 
                            initial={{opacity:0,y:-10,backdropFilter:"blur(10px)"}}
                            animate={{opacity:1,y:0,backdropFilter:"blur(0)"}}
                            transition={{delay:idx*0.30,duration:0.20}}
                            >
                            <Card className="w-full max-w-md h-10 flex items-center justify-center bg-neutral-200 dark:bg-neutral-900"><CardTitle>{work}</CardTitle></Card>
                            {!work.includes("HandOver")&&<div className="h-10 w-px bg-neutral-300 mt-2"/>}
                            {!work.includes("HandOver")&&<ChevronDown size={20} className="text-neutral-400 mb-2"/>}
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    )
}

export default ServicesPage