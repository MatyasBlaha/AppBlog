import Button from "../Components/UI/Button.jsx";
import { NavigationLink } from "../Components/UI/NavLink.jsx";

function HomePage() {
    return (
        <div className="min-h-screen bg-gray-700 text-gray-200 flex flex-col justify-between">
            {/* Hero Section */}
            <header className="text-center py-16">
                <h1 className="text-5xl font-extrabold uppercase tracking-wide text-gray-100 mb-4">
                    Create Your Own Blog
                </h1>
                <p className="text-gray-400 text-lg">
                    Share your ideas and be popular ⭐️ ⭐️ ⭐️ ⭐️ ⭐️
                </p>
            </header>

            {/* Call-to-Action Section */}
            <section className="flex flex-col items-center">
                <NavigationLink
                    to="/posts"
                    className="text-blue-400 hover:text-blue-300 underline text-lg"
                >
                    Continue to Blogs
                </NavigationLink>
            </section>

            {/* Features Section */}
            <section className="bg-gray-800 py-12">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-3xl font-bold text-gray-100 mb-6 text-center">
                        Why Start Your Blog?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Share Your Knowledge
                            </h3>
                            <p className="text-gray-400">
                                Turn your experiences and ideas into content that inspires
                                and educates others.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Build Your Audience
                            </h3>
                            <p className="text-gray-400">
                                Connect with like-minded people and grow your network.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Easy to Start
                            </h3>
                            <p className="text-gray-400">
                                Start blogging with just a few clicks—no technical skills
                                required.
                            </p>
                        </div>
                        <div className="bg-gray-700 p-4 rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold text-gray-100 mb-2">
                                Be Recognized
                            </h3>
                            <p className="text-gray-400">
                                Publish your thoughts and make an impact in the blogging
                                world.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="text-center py-6 text-gray-500 text-sm">
                <p>&copy; 2024 Your Blog Platform. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default HomePage;