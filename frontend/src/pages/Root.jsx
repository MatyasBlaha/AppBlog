import {Outlet} from "react-router";
import MainNavigation from "../Components/common/MainNavigtaion.jsx";

export default function RootPage(){

    return(
        <>
            <MainNavigation />
            <main>
                <Outlet />
            </main>
        </>
    )
}