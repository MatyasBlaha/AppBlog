import {NavigationLink} from "../UI/NavLink.jsx";

export default function PostsNavigation(){

    return (
        <header className='max-w-60 flex justify-between mx-auto p-2'>
            <nav>
                <ul className='flex gap-4'>
                        <NavigationLink to='/posts' end>all posts</NavigationLink>
                        <NavigationLink to='/posts/create'>create Post</NavigationLink>
                </ul>
            </nav>
        </header>
    )
}