import MainNavigation from "../Components/common/MainNavigtaion.jsx";
import { useRouteError, useNavigate } from "react-router";

export default function ErrorPage() {
    const error = useRouteError()
    const navigate = useNavigate()

    function handleNavigateBack(){
        navigate(-1)
    }

    let message = 'There was an error';
    let title = 'There was an error, please try again';

    if (error.status === 500){
        message = error.data.message;
    }

    if(error.status === 404){
        title = 'we could not load data from server';
    }

        return (
            <>
                <MainNavigation/>
                <main className='container mx-auto px-4 sm:px-6 lg:px-8'>
                    <h1>{title}</h1>
                    <p>{message}</p>
                    <button onClick={handleNavigateBack}>Back</button>
                </main>
            </>
        )
}