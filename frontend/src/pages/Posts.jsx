import PostList from "../Components/posts/PostsList.jsx";
import {Await, json, useLoaderData} from "react-router-dom";
import {Suspense} from "react";
import {apiClient} from "../util/apiCalls.js";

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
    const response = await apiClient('/posts', {
        method: 'GET',
    })

    return response.data;
}
