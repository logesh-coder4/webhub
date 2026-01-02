import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import { Toaster } from "@/components/ui/sonner";
import { Suspense } from "react";
import Loader from "@/components/Loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: {
        default:"WebHub | Web, Mobile & Full-Stack Development",
        template:"%s | WebHub",
    },
    description: "We build modern websites, mobile apps, full-stack solutions, APIs, and provide mentorship to turn ideas into real products.",
    keywords:[
        "web development",
        "mobile app development",
        "full stack development",
        "Next.js development",
        "React development",
        "API development",
        "software mentorship",
        "freelance developers",
        "startup development",
    ],
    authors:[{
        name:"WebHub Team"
    }],
    creator:"WebHub",
    openGraph:{
        title:"WebHub | Web, Mobile & Full-Stack Development",
        description:"We design and develop scalable web apps, mobile apps, APIs, and provide expert mentorship",
        url:"",
        siteName:"webhub"
    },
    robots:{
        index:true,
        follow:true
    }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-background" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Suspense fallback={<Loader/>}>
            <Provider>
                {children}
                <Toaster 
                position="top-center" 
                expand={true} 
                visibleToasts={5} 
                richColors={true} 
                closeButton={true}
                invert={true}
                hotkey={['d','a']}
                dir="ltr"
                />
            </Provider>
        </Suspense>
      </body>
    </html>
  );
}
