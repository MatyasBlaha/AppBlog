import React, {useState} from "react";
import {getUserRole, getUserId, getAuthToken} from "../../util/auth.js";
import {IoTrashBin} from "react-icons/io5";
import Button from "../UI/Button.jsx";
import {Link} from "react-router-dom";


function CommentItem({comment, postId, onDeleteComment}) {
    const [replies, setReplies] = useState(comment.replies || []);
    const [showReplies, setShowReplies] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const token = getAuthToken()
    const role = getUserRole()
    const userId = getUserId()
    const isLogin = localStorage.getItem('token')

    const fetchReplies = async () => {
        if (replies.length > 0) {
            setShowReplies((prev) => !prev);
            return;
        }

        setLoadingReplies(true);
        try {
            const response = await fetch(
                `http://localhost:8080/comments/${postId}/comments?parentId=${comment.id}`
            );
            const data = await response.json();
            setReplies(data);
            setShowReplies(true);
        } catch (error) {
            console.error("Failed to load replies", error);
        } finally {
            setLoadingReplies(false);
        }
    };

    const handleReplySubmit = async () => {
        try {
            const response = await fetch(`http://localhost:8080/comments/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({content: replyContent, parentId: comment.id}),
            });

            if (!response.ok) {
                throw new Error("Failed to add reply");
            }
           if(response.ok){
               const newReply = await response.json();
               setReplies((prevReplies) => [...prevReplies, newReply]);
               setReplyContent("");
               setReplying(false);
           }
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    const handleDelete = async () => {

        try {
            const response = await fetch(`http://localhost:8080/comments/${comment.id}/delete`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ parentId: comment.id}),
            });

            if(response.ok){
                onDeleteComment(comment.id)
            }
        } catch (error) {
            console.error("Failed to delete comment", error);
        }
    }

    return (
        <div
            className={`border-l-2 pl-4 ${
                comment.parentId ? 'ml-5' : ''
            } border-gray-500`}>

            {/* Comment Content */}
            <div className="mb-2 mt-10">

                {/* Delete Button */}
                {(role === 'ADMIN' ||
                    role === 'ADMINISTRATOR' ||
                    userId === comment.author.id) && (
                    <button
                        className="text-red-400 hover:text-red-600 transition-all mb-2"
                        onClick={() => handleDelete(comment.id)}>
                        <div className="flex items-center space-x-1">
                            <IoTrashBin />
                            <span>Delete</span>
                        </div>
                    </button>
                )}

                <p className="text-gray-200">
                    <Link to={`/profile/${comment.author.id}`}>
                        <strong className="font-medium">
                            {comment.author?.name || 'Anonymous'}
                        </strong>
                    </Link>
                    {comment.isPostAuthor && (
                        <span className="ml-2 text-xs text-gray-400">Author</span>
                    )}
                    {comment.author?.role === 'ADMIN' && (
                        <span className="ml-2 text-xs text-gray-400">Admin</span>
                    )}
                </p>
                <p className="mt-1 text-gray-300">{comment.content}</p>
            </div>

            {/* Replies Toggle */}
            <button
                className="text-blue-400 hover:text-blue-500 text-sm mt-1 pr-2"
                onClick={fetchReplies}>
                {loadingReplies
                    ? 'Loading...'
                    : showReplies
                        ? 'Hide Replies'
                        : 'Show Replies'}
            </button>

            {/* Replies Section */}
            {showReplies && replies.length > 0 && (
                <div className="mt-3 space-y-3">
                    {replies.map((reply) => (
                        <CommentItem
                            key={reply.id}
                            comment={reply}
                            userId={userId}
                            role={role}
                            replies={[]}
                            fetchReplies={() => {}}
                            showReplies={false}
                            setReplying={() => {}}
                            replying={false}
                            replyContent=""
                            setReplyContent={() => {}}
                            handleReplySubmit={() => {}}
                            loadingReplies={false}
                        />
                    ))}
                </div>
            )}

            {/* Reply Button */}
            {isLogin && (
                <button
                    className="text-blue-400 hover:text-blue-500 text-sm mt-2"
                    onClick={() => setReplying((prev) => !prev)}>
                    {replying ? 'Cancel' : 'Reply'}
                </button>
            )}

            {/* Reply Input */}
            {replying && (
                <div className="mt-2">
          <textarea
              className="w-full p-2 bg-gray-700 text-gray-200 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Write your reply..."
          />
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all"
                        onClick={handleReplySubmit}>
                        Submit Reply
                    </button>
                </div>
            )}
        </div>
    );
}

export default CommentItem;