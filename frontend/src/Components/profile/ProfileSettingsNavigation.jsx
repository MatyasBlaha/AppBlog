import {Link} from "react-router-dom";
import {NavigationLink} from "../UI/NavLink.jsx";
import {getUserId} from "../../util/auth.js";

export default function ProfileSettingsNavigation(){
    const userId = getUserId();

    return (
        <header>
            <nav>
                <ul>
                    <NavigationLink to={`/profile/${userId}/settings/edit`} end>
                        Edit
                    </NavigationLink>
                </ul>
            </nav>
        </header>
    )
}