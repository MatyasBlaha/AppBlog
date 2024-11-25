import React, { useState } from "react";

function CommentItem({ comment, postId }) {
    const [replies, setReplies] = useState(comment.replies || []);
    const [showReplies, setShowReplies] = useState(false);
    const [loadingReplies, setLoadingReplies] = useState(false);
    const [replying, setReplying] = useState(false);
    const [replyContent, setReplyContent] = useState("");

    const fetchReplies = async () => {
        if (replies.length > 0) {
            setShowReplies((prev) => !prev);
            return;
        }

        setLoadingReplies(true);
        try {
            const response = await fetch(
                `http://localhost:8080/posts/${postId}/comments?parentId=${comment.id}`
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
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:8080/posts/${postId}/comment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ content: replyContent, parentId: comment.id }),
            });

            if (!response.ok) {
                throw new Error("Failed to add reply");
            }

            const newReply = await response.json();
            setReplies((prevReplies) => [...prevReplies, newReply]);
            setReplyContent("");
            setReplying(false);
        } catch (error) {
            console.error("Error submitting reply:", error);
        }
    };

    return (
        <div style={{ marginLeft: comment.parentId ? "20px" : "0" }}>
            <p>
                <strong>
                    {comment.author?.name || "Anonymous"}
                    {comment.isPostAuthor && (
                        <span className='text-gray-400'>
                            author
                        </span>
                    )}
                </strong>
                : {comment.content}
            </p>
            <button onClick={fetchReplies}>
                {loadingReplies ? "Loading..." : showReplies ? "Hide Replies" : "Show Replies"}
            </button>

            {showReplies && replies.length > 0 && (
                <div>
                    {replies.map((reply) => (
                        <CommentItem key={reply.id} comment={reply} postId={postId} />
                    ))}
                </div>
            )}

            <button onClick={() => setReplying((prev) => !prev)}>
                {replying ? "Cancel" : "Reply"}
            </button>

            {replying && (
                <div style={{ marginTop: "10px" }}>
                    <textarea
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        placeholder="Write your reply..."
                    />
                    <button onClick={handleReplySubmit}>Submit Reply</button>
                </div>
            )}
        </div>
    );
}

export default CommentItem;
