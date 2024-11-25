import {Await, json, Link, useLoaderData} from "react-router-dom";
import {defer, useRouteLoaderData} from "react-router";
import PostItem from "../Components/posts/PostItem.jsx";
import CommentForm from "../Components/posts/CommentForm.jsx";
import CommentsList from "../Components/posts/CommentsList.jsx";

function PostDetailPage() {
    const post = useLoaderData()

    return (
        <div>
            <Link to="..">Back</Link>
            <PostItem post={post}/>

            <div className="mt-16">
                <CommentForm/>
            </div>
            
            <div className="mt-8">
                <CommentsList post={post}/>
            </div>
        </div>
    );
}

export default PostDetailPage;


export async function addCommentAction({params, request}) {
    const formData = await request.formData()
    const formEntries = Object.fromEntries(formData.entries());

    const id = params.postId
    const token = localStorage.getItem('token')

    try {

        const response = await fetch(`http://localhost:8080/posts/${id}/comment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({content: formEntries.content}),
        })

        if (!response.ok) {
            throw json(
                {message: 'could not add comment'},
                {status: 500}
            );
        }

        const data = response.json;
        console.log(data);
        return data;

    } catch (error) {
        throw json(
            {message: 'failed to add comment'},
            {status: 500}
        );
    }

}

export async function loadPost(id) {

    const response = await fetch('http://localhost:8080/posts/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    if (!response.ok) {
        throw json(
            {message: 'failed to fetch detailed post'},
            {status: 500}
        );
    }

    const data = await response.json()
    return data;

}

export async function loader({params}) {
    const id = params.postId

    try {
        return loadPost(id)
    } catch (error) {
        return null
    }
}