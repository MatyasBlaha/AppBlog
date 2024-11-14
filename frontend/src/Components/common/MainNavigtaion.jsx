import { NavigationLink } from "../UI/NavLink.jsx";

import {Navbar} from "react-bootstrap";

export default function MainNavigation(){

    return(
        <header>
            <Navbar>
                <ul>
                    <NavigationLink to='/'>
                        Blog
                    </NavigationLink>
                    <NavigationLink to='/profile'>
                        profile
                    </NavigationLink>
                </ul>
            </Navbar>
        </header>
    )
}