import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootPage from "./pages/Root.jsx";
import HomePage from "./pages/Home.jsx";
import PostsRootPage from "./pages/Posts.jsx";
import PostDetailPage from "./pages/PostDetail.jsx";

function App() {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <RootPage/>,
                children: [
                    {index: true, element: <HomePage/>},
                    {
                        path: 'posts', children: [
                            {index: true, element: <PostsRootPage/>},
                            {
                                path: ':postId', children: [
                                    {index: true, element: <PostDetailPage/>}
                                ]
                            }
                        ]
                    }
                ]
            },
        ],
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
