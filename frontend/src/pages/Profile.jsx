import {Form, json, Link, useLoaderData} from "react-router-dom";
import {getAuthToken, getUserId} from "../util/auth.js";
import {apiClient} from "../util/apiCalls.js";

function ProfilePage() {
    /**
     * @type {Object}
     * @property {string} id
     * @property {string} name
     * @property {string} email
     * @property {string} profession
     */
    const user = useLoaderData()

    const userId = getUserId()
    const userIdForeign = user.id
    const token = getAuthToken()

    //TODO: add follow other users logic
    async function follow(){
        const response = await apiClient(`/profile/follow/${userIdForeign}/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
    }

    return (
        <div>
            {userId !== userIdForeign && (
                <button onClick={follow}>
                    follow
                </button>
            )
            }
            <p>{user.name}</p>
            <p>{user.email}</p>
            <p>{user.profession}</p>
        </div>
    );
}

export default ProfilePage;

/**
 * Loads the profile data for a user (either their own profile or another user's profile).
 * @async
 * @function profileLoader
 * @param {object} context
 * @param {object} context.params
 * @param {String} context.params.userId
 * @returns {Promise<*>}
 * @throws {Error}
 */

export async function profileLoader({ params }) {
    const token = getAuthToken();
    const userIsActual = getUserId()
    const {userId} = params

    //profile of logged in user
    if (String(userIsActual) === userId) {
        const response = await apiClient(`/auth/profile/${userIsActual}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        })

        return response.data

        // foreign profile
    } else {
        const response = await apiClient(`/profile/${userId}/foreign`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer '+ token
            }
        })

        return response.data
    }

}


