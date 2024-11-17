import {Outlet} from "react-router";

function ProfileRootLayout() {
    return (
        <div>
            <h2>Profile Page</h2>
            <Outlet />
        </div>
    );
}

export default ProfileRootLayout;