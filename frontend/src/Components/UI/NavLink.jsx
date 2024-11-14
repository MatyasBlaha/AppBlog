import { NavLink} from "react-router-dom";
export function NavigationLink({ to, children}) {
    return (
            <li>
                <NavLink to={to} end>
                    {children}
                </NavLink>
            </li>
    );
}

export default NavLink;