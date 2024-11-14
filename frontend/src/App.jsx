import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootPage from "./pages/Root.jsx";

function App() {
  const router = new createBrowserRouter([
    {
      path: '/',
      element: <RootPage />
    },
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
