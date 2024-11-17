import {Outlet} from "react-router";
import MainNavigation from "../Components/common/MainNavigtaion.jsx";

export default function RootPage(){

    return(
        <>
            <MainNavigation />
            <main className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <Outlet />
            </main>
        </>
    )
}