import { getTestimonials } from "@/data/data";
import { Testimonials as TS } from "@/lib/generated/prisma/client";
import { Star } from "lucide-react";


export default async function Testimonials({reviews}:{reviews:TS[]}) {
    return (
        <>
        {reviews.map((item, idx) => (
            <div
                key={idx}
                className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border
                border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg
                hover:-translate-y-2 transition-all"
                >
                <div className="flex gap-1 mb-4">
                    {Array.from({"length":Number(item.ratings)}).map(
                        (rating,idx) => <Star key={idx} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    )}
                </div>

                <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                    {item.message}
                </p>

                <div className="mt-6">
                    <p className="text-lg font-semibold text-neutral-900 dark:text-white capitalize">
                    {item.user.username}
                    </p>
                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                    {item.user.profession}
                    </p>
                </div>
            </div>
        ))}
        </>
    );
}
