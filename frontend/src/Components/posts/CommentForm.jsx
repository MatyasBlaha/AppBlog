import { Form, Link, useActionData } from "react-router-dom";
import Input from "../UI/Input.jsx";
import Button from "../UI/Button.jsx";

export default function CommentForm() {
    const actionData = useActionData();
    const isLogin = localStorage.getItem("token");

    return (
        <div className="mx-auto bg-gray-800 p-6 rounded-lg shadow-md mt-8">
            {/* Error Message */}
            {actionData?.error && (
                <p className="text-red-500 mb-4">{actionData.error}</p>
            )}

            {/* Comment Form */}
            <Form method="post" className="space-y-4">
                <div>
                    <Input
                        type="textarea"
                        id="content"
                        name="content"
                        labelText="Add a comment"
                        className="w-full border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                </div>

                {/* Button / Login Message */}
                <div className="flex justify-end">
                    {isLogin ? (
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition">
                            Send
                        </Button>
                    ) : (
                        <Link
                            to="/auth"
                            className="text-blue-500 hover:underline"
                        >
                            Please log in to comment
                        </Link>
                    )}
                </div>
            </Form>
        </div>
    );
}