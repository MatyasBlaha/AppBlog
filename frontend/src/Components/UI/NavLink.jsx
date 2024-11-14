import { NavLink} from "react-router-dom";
export function NavigationLink({ to, children}) {

    return (
            <li>
                <NavLink
                    to={to}
                    className={({isActive}) => isActive
                        ? 'text-gray-50 no-underline border-b-2'
                        : 'relative text-gray-300 text-md w-fit block after:block after:content-[\'\'] after:absolute after:h-[2px] after:bg-gray-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left'
                }
                    end
                >
                    {children}
                </NavLink>
            </li>
    );
}

export default NavLink;