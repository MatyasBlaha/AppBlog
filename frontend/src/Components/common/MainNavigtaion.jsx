import {NavigationLink} from "../UI/NavLink.jsx";

export default function MainNavigation() {

    return (
        <header>
            <nav>
                <ul>
                    <NavigationLink to='/'>
                        HomePage
                    </NavigationLink>
                    <NavigationLink to='posts'>
                        posts
                    </NavigationLink>
                </ul>
            </nav>
        </header>
    )
}