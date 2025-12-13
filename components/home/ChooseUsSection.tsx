import { CheckCircle, Shield, Clock, Users, Sparkles, Layers } from "lucide-react";

const features = [
  {
    icon: Layers,
    title: "Full-Stack Expertise",
    description:
      "We build complete end-to-end solutions including frontend, backend, mobile, APIs, databases, and deployment.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "We follow a structured workflow ensuring quick, efficient, and high-quality project completion.",
  },
  {
    icon: Shield,
    title: "Reliable & Secure",
    description:
      "Your project is handled with top-level security and clean architecture for long-term reliability.",
  },
  {
    icon: Users,
    title: "1-to-1 Mentorship",
    description:
      "Personal mentorship and guidance for learning, completing tasks, or improving your project.",
  },
  {
    icon: Sparkles,
    title: "Modern Tech Stack",
    description:
      "We use the latest tools like Next.js, React, Prisma, MongoDB, AI integration, and more.",
  },
  {
    icon: CheckCircle,
    title: "Guaranteed Quality",
    description:
      "Every project undergoes detailed review, testing, and optimization for best results.",
  },
];

export default function ChooseUsSection() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-[#0d0d0f]">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Why Choose <span className="text-indigo-600">Us?</span>
          </h2>
          <p className="mt-3 text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            We deliver trusted, high-quality solutions with expertise, speed, 
            and a strong focus on modern development.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="p-6 bg-white dark:bg-[#111113] rounded-2xl shadow-sm border border-gray-200/40 dark:border-white/10 
              hover:shadow-md transition"
            >
              <item.icon className="w-10 h-10 text-indigo-600 mb-4" />

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {item.title}
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
