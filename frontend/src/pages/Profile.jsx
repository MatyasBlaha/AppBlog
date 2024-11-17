import {json, useLoaderData} from "react-router-dom";
import {defer} from "react-router";
import {getAuthToken} from "../util/auth.js";

function ProfilePage() {
    const {user} = useLoaderData()

    return (
        <div>
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.profession}</p>
        </div>
    );
}

export default ProfilePage;

async function fetchUser(id) {
    const token = getAuthToken();

    const response = await fetch('http://localhost:8080/profile/' + id, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    });

    if (!response.ok) {
        throw json(
            { message: 'Could not fetch details for selected event.' },
            {
                status: 500,
            }
        );
    } else {
        const resData = await response.json();
        return resData
    }
}

export async function loader({ request, params }) {
    const id = params.profileId;

    return defer({
        user: await fetchUser(id),
    });
}