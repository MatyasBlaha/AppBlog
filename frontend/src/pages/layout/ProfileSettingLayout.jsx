import {getUserId} from "../../util/auth.js";
import {Outlet} from "react-router";
import ProfileSettingsNavigation from "../../Components/profile/ProfileSettingsNavigation.jsx";

export default function ProfileSettingLayout(){

    return (
        <>
            <ProfileSettingsNavigation/>
            <Outlet/>
        </>
    )
}