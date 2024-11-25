import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";

function CommentsList({ post }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [loadedCount, setLoadedCount] = useState(10);

    const loadComments = async (take = 10, skip = 0) => {
        try {
            const response = await fetch(
                `http://localhost:8080/posts/${post.id}/comments?parentId=null&take=${take}&skip=${skip}`
            );
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Failed to load comments", error);
            return [];
        }
    };

    useEffect(() => {
        async function fetchInitialComments() {
            setLoading(true);
            const initialComments = await loadComments(loadedCount);
            setComments(initialComments);
            setLoading(false);
        }

        fetchInitialComments();
    }, [post.id, loadedCount]);

    const handleLoadMore = async () => {
        setLoadingMore(true);
        const newComments = await loadComments(10, comments.length);
        setComments((prev) => [...prev, ...newComments]);
        setLoadingMore(false);
    };

    return (
        <>
            <h2>Comments</h2>
            {loading ? (
                <p>Loading comments...</p>
            ) : comments.length > 0 ? (
                comments.map((comment) => (
                    <CommentItem
                        key={comment.id}
                        comment={comment}
                        postId={post.id}
                    />
                ))
            ) : (
                <p>No comments yet. Be the first to comment!</p>
            )}

            {comments.length > 0 && (
                <button onClick={handleLoadMore} disabled={loadingMore}>
                    {loadingMore ? "Loading..." : "Load More Comments"}
                </button>
            )}
        </>
    );
}

export default CommentsList;
