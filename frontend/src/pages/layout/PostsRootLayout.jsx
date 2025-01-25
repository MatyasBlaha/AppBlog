import {Outlet} from "react-router";
import PostsNavigation from "../../Components/posts/PostsNavigation.jsx";

export default function PostsRootLayout (){

    return (
        <>
            <PostsNavigation />
            <Outlet />
        </>
    )
}

