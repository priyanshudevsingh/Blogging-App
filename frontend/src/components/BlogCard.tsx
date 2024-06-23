import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";
import moment from "moment";

interface BlogCardProps {
    id: string;
    title: string;
    content: string;
    authorName: string;
    createdAt: moment.Moment;
    updatedAt: moment.Moment;
}

export const BlogCard = ({ id, title, content, authorName, createdAt, updatedAt }: BlogCardProps) => {
    return <Link to={`/blog/${id}`}>
        <div className="border-b border-slate-200 p-4 max-w-screen-lg">
            <div className="flex items-center">
                <Avatar name={authorName} />

                <div className=" font-light px-2">
                    {authorName}
                </div>

                <div>
                    <Circle />
                </div>

                <div className=" px-2 text-slate-600 text-sm font-light">
                    {moment(createdAt).format("MMM DD, YYYY")}
                </div>
            </div>

            <div className="text-xl font-semibold mt-1">
                {title}
            </div>

            <div className="text-md font-light">
                {content.slice(0, 150) + "..."}
            </div>

            <div className="flex justify-between text-slate-800 text-sm font-light mt-2">
                <div>
                    {`${Math.ceil(content.length / 100)} min read`}
                </div>

                {createdAt !== updatedAt ?
                    <div>
                        edited {moment(updatedAt).fromNow()}
                    </div>
                    : null
                }
            </div>
        </div>
    </Link>
}

export function Circle() {
    return <div className="h-0.5 w-0.5 rounded-full bg-slate-400">
    </div>
}