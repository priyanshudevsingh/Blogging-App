import { BlogCard } from "../components/BlogCard"
import { BlogsSkeleton } from "../components/BlogsSkeleton";
import { useBlogs } from "../hooks/useBlogs"

interface Blog {
    id: string;
    title: string;
    content: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
    author: {
        name: string;
    }
}

export const Blogs = () => {
    const { loading, blogs } = useBlogs();

    if (loading) {
        return <div className="flex justify-center">
            <div>
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
                <BlogsSkeleton />
            </div>
        </div>
    }

    return (
        <div>
            <div className="flex justify-center">
                <div>
                    {blogs.map((blog: Blog) => (
                        <BlogCard
                            key={blog.id}
                            id={blog.id}
                            authorName={blog.author.name}
                            createdAt={blog.createdAt}
                            title={blog.title}
                            content={blog.content}
                            updatedAt={blog.updatedAt}
                        />
                    )).reverse()}
                </div>
            </div>
        </div>
    )
}
