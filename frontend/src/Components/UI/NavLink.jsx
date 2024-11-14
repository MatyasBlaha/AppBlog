import { NavLink} from "react-router-dom";
import {Nav} from "react-bootstrap";

export function NavigationLink({ to, children}) {
    return (
            <li>
                <Nav.Link as={NavLink} to={to} end>
                    {children}
                </Nav.Link>
            </li>
    );
}

export default NavLink;