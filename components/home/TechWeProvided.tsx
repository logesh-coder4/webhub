"use client";
import React from "react";
import Image from "next/image";

export default function TechWeProvided() {
  const tech = [
    { name: "React", img: "/tech/react.png" },
    { name: "Next.js", img: "/tech/next.png" },
    { name: "Prisma", img: "/tech/prisma.png" },
    { name: "MongoDB", img: "/tech/mongo.png" },
    { name: "Node.js", img: "/tech/node.png" },
    { name: "Tailwind", img: "/tech/tailwind.png" },
    { name: "TypeScript", img: "/tech/ts.png" },
    { name: "Express", img: "/tech/express.png" },
  ];

  // Duplicate for smooth infinite scroll
  const infinite = [...tech, ...tech];

  return (
    <section className="w-full py-16 bg-white dark:bg-black">
      <h2 className="text-center text-3xl font-bold mb-10">
        Tech Stack <span className="text-indigo-600">We Use</span>
      </h2>

      <div className="overflow-hidden whitespace-nowrap relative">
        <div
          className="flex gap-16 animate-scroll"
          style={{
            animation: "scroll 20s linear infinite",
          }}
        >
          {infinite.map((t, i) => (
            <div key={i} className="flex flex-col items-center">
              {/* <Image
                src={t.img}
                alt={t.name}
                width={60}
                height={60}
                className="opacity-90 hover:opacity-100 transition"
              /> */}
              <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-2">
                {t.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
}
