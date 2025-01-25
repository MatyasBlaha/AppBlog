import {Await, json, Link, useLoaderData} from "react-router-dom";
import {defer, useRouteLoaderData} from "react-router";
import PostItem from "../Components/posts/PostItem.jsx";
import CommentForm from "../Components/posts/CommentForm.jsx";
import CommentsList from "../Components/posts/CommentsList.jsx";
import {apiClient} from "../util/apiCalls.js";
import {Suspense, useState} from "react";


function PostDetailPage() {
    const { post, comments } = useLoaderData();
    const [showComments, setShowComments] = useState(false);

    const toggleComments = () => {
        setShowComments((prev) => !prev);
    };

    return (
        <div>
            <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
                <Await resolve={post}>
                    <Link to="..">Back</Link>
                    <PostItem post={post} />
                </Await>
            </Suspense>

            <div className="mt-8">
                <button
                    onClick={toggleComments}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    {showComments ? "Hide Comments" : `Show Comments: ${comments.length}`}
                </button>

                {showComments && (
                    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading comments...</p>}>
                        <Await resolve={comments}>
                            <div className="mt-8">
                                <CommentsList initialComment={comments} />
                            </div>
                        </Await>
                    </Suspense>
                )}
            </div>

            <div className="mt-16">
                {showComments && <CommentForm />}
            </div>
        </div>
    );
}

export default PostDetailPage;


export async function addCommentAction({params, request}) {
    const formData = await request.formData();
    const formEntries = Object.fromEntries(formData.entries());
    const id = params.postId;
    const token = localStorage.getItem("token");

    const response = await apiClient(`/comments/${id}/comment`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({content: formEntries.content}),
    });

    return response;
}


export async function loader({ params }) {
    const id = params.postId;

    return defer({
        post: await loadPost(id),
        comments: await loadComments(id),
    });
}


export async function loadPost(id) {
    const response = await apiClient(`/posts/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.data
}

export async function loadComments(id) {
    const response = await apiClient(`/comments/${id}/comments`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    return response.data;
}
