import {apiClient} from "../util/apiCalls.js";

// TODO: make post edit page logic and content
function EditPostPage() {
    return (
        <>
            <p>Some content</p>
        </>
    );
}

export default EditPostPage;

export async function loader({ params }) {
    const postId = params.postId
    console.log(postId)

    const response = await apiClient(`/posts/${postId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    })

    console.log(response.data)
}