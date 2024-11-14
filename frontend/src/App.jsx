import {RouterProvider, createBrowserRouter} from "react-router-dom";
import RootPage from "./pages/Root.jsx";


function App() {
    const router = createBrowserRouter(
        [
            {
                path: '/',
                element: <RootPage />
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
