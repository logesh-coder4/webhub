'use client'
import BlogCard from "@/components/BlogCard";
import { getPublishedBlogs } from "@/data/data";
import { Blog } from "@/lib/generated/prisma/client";
import { useEffect, useState } from "react";

function BlogPage() {
  const [blogs,setBlogs]=useState<Blog[]>([])
  useEffect(()=>{
    const fetchBlogs=async () => {
        const data=await getPublishedBlogs()
        setBlogs(data!)
    }
    fetchBlogs()
  },[])

  return (
    <div className="max-w-3xl space-y-2 h-full">
        {blogs.map(blog=><BlogCard key={blog.id} {...blog}/>)}
    </div>
  );
}

export default BlogPage