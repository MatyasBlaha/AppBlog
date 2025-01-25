import {getAuthToken, getUserId} from "../util/auth.js";
import {apiClient} from "../util/apiCalls.js";
import {useLoaderData} from "react-router-dom";
import { MdEdit } from "react-icons/md";


function EditProfilePage(){
    const user = useLoaderData()
    console.log(user)

    return (
        <>
            <div className="flex">
                <p>{user.email}</p>
                <MdEdit/>
            </div>
            <div className="flex">
                <p>{user.name}</p>
                <MdEdit/>
            </div>
        </>
    )
}

export default EditProfilePage;

export async function editProfileLoader({params}) {
    const token = getAuthToken();
    const userIsActual = getUserId();
    const {userId} = params

    if(String(userIsActual) === userId) {
        const response = await apiClient(`/auth/profile/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        })
        console.log(response.data)
        return response.data
    }
}