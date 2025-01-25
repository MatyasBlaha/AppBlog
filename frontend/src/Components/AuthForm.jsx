import { Form, Link, useNavigation, useActionData } from "react-router-dom";

function AuthForm({ mode }) {
    const navigation = useNavigation();
    const actionData = useActionData();
    const isLogin = mode === "login";
    const isSubmitting = navigation.state === "submitting";

    let registerContent = (
        <div className="space-y-4">
            <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
                    Confirm Password
                </label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-4"
                />
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                    Full Name
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-4"
                />
            </div>
            <div>
                <label htmlFor="profession" className="block text-sm font-medium text-gray-300">
                    Profession
                </label>
                <select
                    name="profession"
                    id="profession"
                    required
                    className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-4"
                >
                    <option value="" className="text-gray-500">
                        Select profession
                    </option>
                    <option value="developer">Developer</option>
                    <option value="chef">Chef</option>
                    <option value="photographer">Photographer</option>
                    <option value="journalist">Journalist</option>
                    <option value="student">Student</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="flex items-center">
                <input
                    type="checkbox"
                    id="terms-and-conditions"
                    name="terms"
                    required
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-500 rounded"
                />
                <label htmlFor="terms-and-conditions" className="ml-2 block text-sm text-gray-300">
                    I agree to the terms and conditions
                </label>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen text-gray-200 flex items-center justify-center">
            <Form method="post" className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-gray-100 text-center mb-6">
                    {isLogin ? "Login to Your Account" : "Create an Account"}
                </h2>

                {/* Error Message Section */}
                {actionData?.message && (
                    <div className="mb-4 p-3 text-sm text-red-700 bg-red-100 rounded">
                        {actionData.message}
                    </div>
                )}

                <div className="space-y-4">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            required
                            className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-4"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            required
                            className="mt-1 block w-full rounded-md border-gray-500 bg-gray-700 text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-lg py-3 px-4"
                        />
                    </div>

                    {!isLogin && registerContent}

                    <div className="flex justify-between items-center mt-6">
                        <Link
                            to={`?mode=${isLogin ? "signup" : "login"}`}
                            className="text-sm font-medium text-blue-400 hover:text-blue-300"
                        >
                            {isLogin ? "New user? Sign up" : "Already have an account? Login"}
                        </Link>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`px-4 py-3 font-medium rounded-md ${
                                isSubmitting
                                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                    : "bg-blue-600 text-white hover:bg-blue-500"
                            } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                        >
                            {isSubmitting ? "Please wait..." : isLogin ? "Login" : "Register"}
                        </button>
                    </div>
                </div>
            </Form>
        </div>
    );
}

export default AuthForm;