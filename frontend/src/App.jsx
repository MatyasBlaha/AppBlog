import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootPage from "./pages/layout/Root.jsx";
import HomePage from "./pages/Home.jsx";
import PostsPage, {postsLoader} from "./pages/Posts.jsx";
import PostDetailPage, {loader as postDetailLoader, addCommentAction} from "./pages/PostDetail.jsx";
import PostsRootLayout from "./pages/layout/PostsRootLayout.jsx";
import ErrorPage from "./pages/Error.jsx";
import AuthenticationPage, {action as authAction} from "./pages/Authentication.jsx";
import {checkAuthLoader, tokenLoader} from "./util/auth.js";
import ProfilePage, { profileLoader } from "./pages/Profile.jsx";
import ProfileRootLayout from "./pages/layout/ProfileRoot.jsx";
import { action as logoutAction } from './pages/Logout.js'
import CreatePostPage, { action as CreatePostAction} from "./pages/CreatePost.jsx";
import EditPostPage, {loader as editPageLoader} from "./pages/EditPost.jsx";
import ProfilePostsPage, {loader as profilePostsLoader} from "./pages/ProfilePosts.jsx";
import ProfileUsersListPage, {loader as profileUsersListLoader} from "./pages/ProfileUsersList.jsx";
import EditProfilePage, {editProfileLoader} from "./pages/EditProfile.jsx";
import ProfileSettingLayout from "./pages/layout/ProfileSettingLayout.jsx";

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
                                        element: <EditPostPage/>,
                                        loader: editPageLoader,
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
                            {path: ':userId', children: [
                                    {index: true,loader: profileLoader, element: <ProfilePage/>},
                                    {path: 'posts', loader: profilePostsLoader, element: <ProfilePostsPage/>},
                                    {path: 'usersList', loader: profileUsersListLoader, element: <ProfileUsersListPage />},
                                    {path: 'settings', element: <ProfileSettingLayout/>, children: [
                                    {path: 'edit', loader: editProfileLoader, element: <EditProfilePage/>}
                                        ]},
                                ]}
                        ]
                    },

                    // LOGOUT
                    {path: 'logout', action: logoutAction},
                ]
            },
        ],

        // BUG FIX - REACT ROUTER V7 BUG... MUSI ZDE BYT!
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
