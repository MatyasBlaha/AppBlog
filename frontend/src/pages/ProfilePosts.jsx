import {defer} from "react-router";
import {apiClient} from "../util/apiCalls.js";
import {useLoaderData} from "react-router-dom";
import PostList from "../Components/posts/PostsList.jsx";

export default function ProfilePostsPage(){
    const { profilePosts } = useLoaderData()

    return (
        <>
            <p>Profile posts</p>
            <PostList posts={profilePosts}/>
        </>
    )
}

export async function loadProfilePostsData(id) {
    try {
        const response = await apiClient(`/profile/${id}/posts`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
        })

        return response.data
    } catch(error) {
        console.log("error loading")
    }
}

export async function loader({params}){
    const id = params.userId

    return defer({
        profilePosts: await loadProfilePostsData(id),
    })
}