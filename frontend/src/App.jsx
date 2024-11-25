import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootPage from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import PostsPage, {postsLoader} from "./pages/Posts.jsx";
import PostDetailPage, {loader as postDetailLoader, addCommentAction} from "./pages/PostDetail.jsx";
import PostsRootLayout from "./pages/PostsRootLayout.jsx";
import ErrorPage from "./pages/Error.jsx";
import AuthenticationPage, {action as authAction} from "./pages/Authentication.jsx";
import {checkAuthLoader, tokenLoader} from "./util/auth.js";
import ProfilePage, {loader as profileLoader} from "./pages/Profile.jsx";
import ProfileRootLayout from "./pages/ProfileRoot.jsx";
import { action as logoutAction } from './pages/Logout.js'
import CreatePostPage, { action as CreatePostAction} from "./pages/CreatePost.jsx";

function App() {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <RootPage/>,
                errorElement: <ErrorPage/>,
                id: 'root',
                loader: tokenLoader,
                children: [
                    {index: true, element: <HomePage/>},

                    // POSTS
                    {
                        path: 'posts',
                        element: <PostsRootLayout/>,
                        children: [
                            {index: true, element: <PostsPage/>, loader: postsLoader},
                            {
                                path: ':postId',
                                id: 'post-detail',
                                children: [
                                    {
                                        index: true,
                                        element: <PostDetailPage/>,
                                        loader: postDetailLoader,
                                        action: addCommentAction
                                    },
                                    {
                                        path: 'edit',
                                    }
                                ]
                            },
                            {path: 'new', element: <CreatePostPage/>, loader: checkAuthLoader, action: CreatePostAction}
                        ]
                    },

                    // AUTHENTICATION
                    {path: 'auth', element: <AuthenticationPage/>, action: authAction},

                    // PROFILE SECTION
                    {
                        path: 'profile', element: <ProfileRootLayout/>, loader: checkAuthLoader, children: [
                            {path: ':profileId',children: [
                                    {index: true,loader: profileLoader, element: <ProfilePage/>}
                                ]}
                        ]
                    },

                    // LOGOUT
                    {path: 'logout', action: logoutAction},
                ]
            },
        ],

        // BUG FIX - REACT ROUTER V7 BUG...
        {
            future: {
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_relativeSplatPath: true,
                v7_skipActionErrorRevalidation: true,
            },
        }
    )

    return (
        <>
            <RouterProvider router={router} future={{v7_startTransition: true}}/>
        </>
    )
}

export default App
