import {NavigationLink} from "../UI/NavLink.jsx";
import {getUserId, getUserRole} from "../../util/auth.js";

export default function ProfileNavigation(){
    const userId = getUserId();
    const userRole = getUserRole();

    return(
        <header className='max-w-60 flex justify-between mx-auto p-2'>
            <nav>
                <ul className='flex gap-4'>
                    <NavigationLink to={`/profile/${userId}`} end>profile</NavigationLink>
                    <NavigationLink to={`/profile/${userId}/posts`}>all posts</NavigationLink>
                    {userRole === 'ADMIN' && (
                        <>
                            <NavigationLink to={`/profile/${userId}/usersList`}>users list</NavigationLink>
                            <NavigationLink to={`/profile/${userId}/settings`}>setting</NavigationLink>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    )
}