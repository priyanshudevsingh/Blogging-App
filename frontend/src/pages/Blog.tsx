import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/useBlog"
import { BlogContent } from "../components/BlogContent";
import { BlogSkeleton } from "../components/BlogSkeleton";

export const Blog = () => {
    const { id } = useParams();
    const { loading, blog } = useBlog({ id: id || "" });
    if (loading) {
        return <div>
            <BlogSkeleton/>
        </div>
    }

    return (
        <div>
            {blog && <BlogContent blog={blog} />}
        </div>
    )
}