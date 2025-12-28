import BlogCard from "@/components/BlogCard";
import { getPublishedBlogs } from "@/data/data";
import { connection } from "next/server";

async function ArticlePage({params}:{params:Promise<{path:string}>}) {
    await connection()
    const blogs=await getPublishedBlogs()
    const {path}=await params
    return (
        <div className="max-w-3xl space-y-2 h-full mb-10">
            {
                path==="articles"?<>
                {blogs.map(blog=><BlogCard key={blog.id} {...blog}/>)}
                </>:<>
                <div>Error</div>
                </>
            }
        </div>
    );
}

export default ArticlePage