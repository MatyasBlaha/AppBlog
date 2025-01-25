import { useState } from "react";
import { IoClose } from "react-icons/io5";

function ProfileDetailModal({ user, onClose, onSave }) {
    const [selectedRole, setSelectedRole] = useState(user.role);
    const [message, setMessage] = useState(null);
    const [messageType, setMessageType] = useState('')

    const handleRoleChange = (event) => {
        setSelectedRole(event.target.value);
    };

    const handleSubmit = async () => {
        const response = await onSave(user.id, selectedRole);
        setMessage(response.message);
        setMessageType(response.type)
    };

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
            <div className="bg-gray-800 p-6 rounded-lg text-white w-96">
                <div className='flex justify-between'>
                    <h2 className="text-xl font-bold">User Details</h2>
                    <button onClick={onClose} className='hover:text-red-400'>
                        <IoClose size={24}/>
                    </button>
                </div>
                <p className='mt-4'>
                    <strong>Name:</strong> {user.name}
                </p>
                <p>
                    <strong>Email:</strong> {user.email}
                </p>
                <div className="mt-4">
                    <label className="block mb-2">
                        <strong>Role:</strong>
                        <select
                            value={selectedRole}
                            onChange={handleRoleChange}
                            className="ml-2 bg-gray-700 text-white rounded p-1"
                        >
                            <option value="USER">User</option>
                            <option value="ADMIN">Admin</option>
                            <option value="EDITOR">Editor</option>
                        </select>
                    </label>
                </div>
                <div className="mt-4 flex justify-end gap-2">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>
                </div>

                {message && (
                    <div
                        className={`mt-4 text-sm ${
                            messageType === "success"
                                ? "text-green-500"
                                : "text-red-500"
                        }`}
                    >
                        {message}
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfileDetailModal;