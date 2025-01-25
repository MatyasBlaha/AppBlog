import React, { useState, useEffect } from "react";
import CommentItem from "./CommentItem";
import {useParams} from "react-router";

function CommentsList({ initialComment = [] }) {
    const params = useParams()

    const [comments, setComments] = useState(initialComment);

    function onDeleteComment(commentId){
        setComments((prevComment) => prevComment.filter((comment) => comment.id !== commentId))
    }

    return (
        <>
            <h2>Comments: {comments.length}</h2>
            {comments.length === 0 ? (
                <p>No comments yet</p>
            ) : (
                comments.map((comment) => (
                        <CommentItem
                            key={comment.id}
                            comment={comment}
                            postId={params.postId}
                            onDeleteComment={onDeleteComment}
                        />
                    ))
            )}
        </>
    );
}

export default CommentsList;
