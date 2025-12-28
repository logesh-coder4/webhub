import { ServiceType } from "@/lib/types";
import {
  BookOpen,
  Cpu,
  Globe,
  GraduationCap,
  Layers,
  Smartphone,
} from "lucide-react";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const ServiceCard=({name,description,icon:Icon}:ServiceType)=>{
    return(
        <div>
            <Card className="max-w-md py-8 hover:border-l-2 bg-white dark:bg-[#111113] hover:border-l-zinc-900 dark:hover:border-l-zinc-400">
                <CardHeader className="flex">
                    {Icon}
                    <CardTitle className="translate-y-0.5">{name}</CardTitle>
                </CardHeader>
                <CardContent>
                    <h2>{description}</h2>
                </CardContent>
            </Card>
        </div>
    )
}

const ServiceSection = () => {
    const services: ServiceType[] = [
    {
      name: "Web Development",
      description:
        "Custom websites built with Next.js, React, and modern UI — fast, responsive, and scalable.",
      icon: <Globe/>,
    },
    {
      name: "Mobile App Development",
      description:
        "Cross-platform mobile apps with smooth UX and powerful backends.",
      icon: <Smartphone/>,
    },
    {
      name: "Full-Stack Solutions",
      description:
        "Complete systems from frontend to database — powered by Next.js and Prisma.",
      icon: <Layers/>,
    },
    {
      name: "Mentorship & Guidance",
      description:
        "Personalized mentorship to help you master real-world development and deploy confidently.",
      icon: <GraduationCap/>,
    },
    {
      name: "Learning Guidance",
      description: "Smart, future-ready web apps with AI-powered features.",
      icon: <BookOpen/>,
    },
    {
      name: "AI Integration",
      description: "Smart, future-ready web apps with AI-powered features.",
      icon: <Cpu/>,
    },
    ];
    const words="Delivering everything you need — from web to mobile to mentorship, all in one place."
  return (
    <div className="w-full py-10">
        <div className="text-center p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Services We <span className="text-indigo-600">Provided?</span>
            </h2>
            <TextGenerateEffect words={words}/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 space-y-2 gap-4 p-4 px-6 my-4">
            {services.map((service,idx)=><ServiceCard key={idx} {...service}/>)}
        </div>
    </div>
  )
}

export default ServiceSection