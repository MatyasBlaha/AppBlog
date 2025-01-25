import { NavigationLink } from "../UI/NavLink.jsx";
import { useRouteLoaderData } from "react-router";
import { getUserId } from "../../util/auth.js";
import { Form } from "react-router-dom";
import { useState } from "react";

export default function MainNavigation() {
    const token = useRouteLoaderData('root');
    const userId = getUserId();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        setIsMenuOpen(false);
    };

    return (
        <header className="max-w-60 flex justify-between mx-auto p-2">
            <nav>
                <ul className="flex gap-4 items-center">
                    <NavigationLink to="/">HomePage</NavigationLink>
                    <NavigationLink to="/posts">Posts</NavigationLink>
                    {!token && (
                        <NavigationLink to="/auth?mode=login">Login</NavigationLink>
                    )}
                    {token && (
                        <div className="relative">
                            <button
                                className="relative"
                                onMouseEnter={() => setIsMenuOpen(true)}
                                onMouseLeave={() => setIsMenuOpen(false)}
                            >
                                <NavigationLink to={`/profile/${userId}`}>
                                    Profile
                                </NavigationLink>
                            </button>
                            {isMenuOpen && (
                                <ul
                                    className="absolute top-full left-0 bg-gray-800 border rounded shadow-md p-2 space-y-2 z-50"
                                    onMouseEnter={() => setIsMenuOpen(true)}
                                    onMouseLeave={() => setIsMenuOpen(false)}
                                >
                                    <li className='space-y-3'>
                                        <NavigationLink to={`/profile/${userId}/posts`} shouldNotBeActive={true}>
                                            My posts
                                        </NavigationLink>
                                        <NavigationLink to={`/profile/${userId}/usersList`} shouldNotBeActive={true}>
                                            users list
                                        </NavigationLink>
                                    </li>
                                    <li>
                                        <hr className="border-gray-700 my-2"/>
                                    </li>
                                    <li>
                                        <Form action="/logout" method="post" onSubmit={handleLogout}>
                                            <button className="hover:bg-red-700 w-full text-left p-2">
                                                Logout
                                            </button>
                                        </Form>
                                    </li>
                                </ul>
                            )}
                        </div>
                    )}
                </ul>
            </nav>
        </header>
    );
}