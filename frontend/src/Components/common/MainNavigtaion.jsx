import {NavigationLink} from "../UI/NavLink.jsx";
import {useRouteLoaderData} from "react-router";

export default function MainNavigation() {
    const token = useRouteLoaderData('root')
    const userId = localStorage.getItem('userId')

    return (
        <header className="max-w-60 flex justify-between mx-auto p-2">
            <nav>
                <ul className="flex gap-4">
                    <NavigationLink to="/">HomePage</NavigationLink>
                    <NavigationLink to="/posts">Posts</NavigationLink>
                    {!token && (
                        <NavigationLink to="/auth?mode=login">Login</NavigationLink>
                    )}
                    {token && (
                        <NavigationLink to={`/profile/${userId}`}>Profile</NavigationLink>
                    )}
                </ul>
            </nav>
        </header>
    );
}