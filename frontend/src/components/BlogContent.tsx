import moment from "moment"
import { Blog } from "../hooks/useBlog"
import { Avatar } from "./Avatar"

export const BlogContent = ({ blog }: { blog: Blog }) => {
    return (
        <div>
            <div className="grid grid-cols-12 px-10 pt-20">
                <div className="col-span-8 pr-5">
                    <div className="text-4xl font-extrabold">
                        {blog.title}
                    </div>

                    <div className="flex justify-between">
                        <div className="text-slate-500 text-md pb-4">
                            Posted on {moment(blog.createdAt).format("MMMM DD, YYYY")}
                        </div>

                        {blog.createdAt !== blog.updatedAt ?
                            <div className="text-slate-500 text-md pb-4">
                                Edited {moment(blog.updatedAt).fromNow()}
                            </div>
                            : null
                        }
                    </div>

                    <div className="text-lg text-slate-700 mb-8">
                        {blog.content}
                    </div>
                </div>

                <div className="col-span-4 pl-5">
                    <div className="text-lg">
                        Author
                    </div>

                    <div className="flex mt-3">
                        <div>
                            <Avatar size="big" name={blog.author.name} />
                        </div>

                        <div className="px-2">
                            <div className="font-bold text-2xl text-slate-800">
                                {blog.author.name}
                            </div>
                            <div className="text-slate-700">
                                Random catch phrase about the author's ability to grab the reader's attention.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}