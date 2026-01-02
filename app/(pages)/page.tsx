import ChooseUsSection from "@/components/home/ChooseUsSection";
import HeroSection from "@/components/home/HeroSection";
import ServiceSection from "@/components/home/ServiceSection";
import TechWeProvided from "@/components/home/TechWeProvided";
import Testimonials from "@/components/home/Testimonials";
import { Skeleton } from "@/components/ui/skeleton";
import { Suspense } from "react";
import { getTestimonials } from "@/data/data";
import { connection } from "next/server";

const TestimonialSkeleton=()=>{
    return(
        <>
        {Array.from({length:3}).map((_,idx)=>(
            <Skeleton className="w-96 p-8 rounded-3xl flex flex-col gap-y-2 bg-white dark:bg-neutral-900 border" key={idx}>
                <Skeleton className="h-4 w-30 bg-gray-200"/>
                <Skeleton className="h-8 w-full bg-gray-200"/>
                <Skeleton className="h-4 w-20 bg-gray-200"/>
            </Skeleton>
        ))}
        </>
    )
}

const Home = async() => {
    await connection()
    const data=await getTestimonials()
    return (
    <div>
        <HeroSection />
        <ServiceSection/>
        <ChooseUsSection/>
        <TechWeProvided/>
        <section className="w-full py-20 bg-neutral-50 dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6">
                {data.data.length!==0&&
                <h2 className="text-center text-4xl font-bold mb-12">
                    What Our <span className="text-indigo-600">Clients Say</span>
                </h2>
                }
                <div className="grid md:grid-cols-3 gap-8">
                    <Suspense fallback={<TestimonialSkeleton/>}>
                        <Testimonials reviews={data.data} />
                    </Suspense>
                </div>
            </div>
        </section>
    </div>
    );
};

export default Home;
