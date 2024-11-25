import PostList from "../Components/posts/PostsList.jsx";
import {Await, json, useLoaderData} from "react-router-dom";
import {Suspense} from "react";

function PostsPage() {
    const posts = useLoaderData()

    return (
        <div>
            <Suspense fallback={<p>Loading...</p>}>
                <Await resolve={posts}>
                    {(loadedPosts) => <PostList posts={loadedPosts}/>}
                </Await>
            </Suspense>
        </div>
    );
}

export default PostsPage;

export async function postsLoader() {

    const response = await fetch('http://localhost:8080/posts')

    if (!response.ok) {
        throw json(
            {message: 'failed to fetch posts'},
            {status: 500}
        );
    } else {
        const resData = await response.json();
        return resData;
    }
}
