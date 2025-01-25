import {Outlet} from "react-router";
import ProfileNavigation from "../../Components/profile/ProfileNavigation.jsx";

function ProfileRootLayout() {
    return (
        <div>
            <ProfileNavigation/>
            <Outlet />
        </div>
    );
}

export default ProfileRootLayout;