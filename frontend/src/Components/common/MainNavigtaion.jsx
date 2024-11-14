import { NavigationLink } from "../UI/NavLink.jsx";

export default function MainNavigation(){

    return(
        <header>
            <nav>
                <ul>
                    <NavigationLink to='/'>
                        Blog
                    </NavigationLink>
                    <NavigationLink to='/profile'>
                        profile
                    </NavigationLink>
                </ul>
            </nav>
        </header>
    )
}