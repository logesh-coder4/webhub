import { Star } from "lucide-react";

export default function Testimonials() {
  const reviews = [
    {
      name: "Rahul S.",
      role: "Startup Founder",
      review:
        "Amazing experience! They delivered my website faster than expected with clean code and a modern UI.",
    },
    {
      name: "Priya K.",
      role: "Student",
      review:
        "Fantastic mentorship. I improved my coding skills, built real projects, and gained confidence.",
    },
    {
      name: "Aakash M.",
      role: "Freelancer",
      review:
        "Their full-stack support helped me finish my client project on time. Very professional!",
    },
  ];

  return (
    <section className="w-full py-20 bg-neutral-50 dark:bg-neutral-950">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-center text-4xl font-bold mb-12">
          What Our <span className="text-indigo-600">Clients Say</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((item, idx) => (
            <div
              key={idx}
              className="p-8 rounded-3xl bg-white dark:bg-neutral-900 border
              border-neutral-200 dark:border-neutral-800 shadow-sm hover:shadow-lg
              hover:-translate-y-2 transition-all"
            >
              <div className="flex gap-1 mb-4">
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
              </div>

              <p className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed">
                {item.review}
              </p>

              <div className="mt-6">
                <p className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {item.name}
                </p>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  {item.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
