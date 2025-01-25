import { format } from "date-fns";
import {getUserId} from "../../util/auth.js";
import Button from "../UI/Button.jsx";
import {Link} from "react-router-dom";

function PostItem({ post }) {
    const userId = getUserId()

    const formattedDate = format(new Date(post.createdAt), "MMM dd, yyyy HH:mm");
    const sortedContent = post.content.sort((a, b) => a.order - b.order);

    return (
        <div className=" mx-auto px-6 py-8 bg-gray-800 ">
            {/* Header Section */}
            {post.authorId === userId && <Link to={`/posts/${post.id}/edit`}>Edit</Link>}
            <header className="mb-8">
                <h1 className="text-4xl font-extrabold text-gray-200 mb-2">
                    {post.title}
                </h1>
                <p className="text-sm text-gray-400">
                    By <span className="font-medium">
                    <Link to={`/profile/${post.authorId}`}>{post.author.name}</Link>
                </span> | {formattedDate}
                </p>
            </header>

            {/* Content Section */}
            <div className="space-y-6">
                {sortedContent.map((contentItem) => (
                    <div key={contentItem.order}>
                        {/* Text Content */}
                        {contentItem.type === "text" && (
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {contentItem.content}
                            </p>
                        )}
                        {/* Image Content */}
                        {contentItem.type === "image" && (
                            <div className="my-4">
                                <img
                                    src={`${contentItem.imageUrl}?f_auto,q_auto,w-auto`}
                                    alt="Post Image"
                                    className="w-full rounded-lg shadow-md object-cover max-w-80"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PostItem;