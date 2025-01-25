import { Link } from "react-router-dom";
import { getUserRole } from "../../util/auth.js";
import { IoTrashBin } from "react-icons/io5";
import React from "react";

export default function PostList({ posts }) {
    const role = getUserRole();
    const userId = getUserRole();


    function deletePost(id) {
        console.log(id);
    }

    // Helper function to find the first image URL in the content array
    function findImageUrl(content) {
        const imageContent = content.find(
            (item) => item.type === "image" && item.imageUrl
        );
        return imageContent ? imageContent.imageUrl : null;
    }

    return (
        <div className="p-6">
            {posts.length === 0 && <p>No posts yet</p>}
            {/* Grid Layout */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => {
                    const imageUrl = findImageUrl(post.content);

                    return (
                        <li
                            key={post.id}
                            className="p-4 bg-gray-800 rounded-lg shadow-lg text-gray-200 hover:bg-gray-700 transition-all"
                        >
                            {/* Delete button */}
                            {(role === "ADMIN" ||
                                role === "ADMINISTRATOR" ||
                                userId === post.author.id) && (
                                <button
                                    className="flex items-center space-x-2 text-red-400 hover:text-red-500 transition-all mb-2"
                                    onClick={() => deletePost(post.id)}
                                >
                                    <IoTrashBin size={18} />
                                    <span className="font-medium">Delete</span>
                                </button>
                            )}

                            {/* Image and text container */}
                            <Link
                                to={`/posts/${post.id}`}
                                className="flex flex-col group"
                            >
                                {/* Image (if exists) */}
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={post.title}
                                        className="w-full h-48 object-cover rounded-md mb-4 group-hover:opacity-90 transition-all"
                                    />
                                )}

                                {/* Post Details */}
                                <div className="flex-1">
                                    <p className="text-sm text-gray-400 group-hover:text-gray-300 transition-all">
                                        {new Date(post.createdAt).toLocaleDateString()}
                                    </p>
                                    <h3 className="text-lg font-semibold group-hover:text-white transition-all">
                                        {post.title}
                                    </h3>
                                    <p className="text-sm text-gray-400">
                                        By: {post.author.name}
                                    </p>

                                    {/* Post Excerpt */}
                                    {post.content.map(
                                        (content) =>
                                            content.order === 1 && (
                                                <p
                                                    key={content.id}
                                                    className="text-gray-300 mt-2"
                                                >
                                                    {content.content}
                                                </p>
                                            )
                                    )}
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}