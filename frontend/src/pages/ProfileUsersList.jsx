import {redirect, useLoaderData, useSubmit} from "react-router-dom";
import { useState } from "react";
import ProfileDetailModal from "../Components/profile/ProfileDetailModal.jsx";
import {getAuthToken, getUserId, getUserRole} from "../util/auth.js";
import {apiClient} from "../util/apiCalls.js";

function ProfileUsersListPage() {
    const [users, setUsers] = useState(useLoaderData());
    const [selectedUser, setSelectedUser] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const token = getAuthToken();

    const handleRowClick = (user) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedUser(null);
    };

    const handleSaveRole = async (userId, newRole) => {
        try {
            const response = await apiClient(`/profile/${userId}/changeUserRole`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ` + token,
                },
                body: JSON.stringify({role: newRole}),
            })

            if(!response.success){
                return {
                    message: response.error,
                    type: 'error',
                };
            }
            return {
                message: response.data.message,
                type:'success',
            };
        } catch(error){
            console.error("Failed to save role", error);
        }
    };

    return (
        <div className="container mx-auto p-6 bg-gray-800 text-white rounded-lg">
            <table className="table-auto w-full text-left">
                <thead className="text-gray-400 border-b border-gray-700">
                <tr>
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Email</th>
                    <th className="px-4 py-2">Role</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr
                        key={user.id}
                        className="hover:bg-gray-700 cursor-pointer"
                        onClick={() => handleRowClick(user)}
                    >
                        <td className="px-4 py-2">{user.name}</td>
                        <td className="px-4 py-2">{user.email}</td>
                        <td className="px-4 py-2">{user.role}</td>
                    </tr>
                ))}
                </tbody>
            </table>

            {isModalOpen && (
                <ProfileDetailModal
                    user={selectedUser}
                    onClose={handleCloseModal}
                    onSave={handleSaveRole}
                />
            )}
        </div>
    );
}

export default ProfileUsersListPage;

export async function loader({ params }) {
    const token = getAuthToken();
    const userIsActual = getUserId()
    const {userId} = params
    const userRole = getUserRole();

    if (userRole !== 'ADMIN' || userIsActual !== userId) {
        return redirect(`/profile/${userId}`);
    }

        const response = await apiClient(`/profile/${userIsActual}/usersList`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + token,
            },
        });

    return response.data
}