import { NavLink, useLocation } from "react-router-dom";

export function NavigationLink({ to, children, shouldNotBeActive = false, ...props }) {
    const location = useLocation();

    // Check if the current path matches and disable active state
    const isPathActive = location.pathname === to;

    return (
        <li className="list-none text-nowrap">
            <NavLink
                {...props}
                to={to}
                className={({ isActive }) =>
                    isActive && !shouldNotBeActive
                        ? "text-gray-50 no-underline border-b-2 pointer-events-none opacity-50"
                        : "relative text-gray-300 text-md w-fit block after:block after:content-[''] after:absolute after:h-[2px] after:bg-gray-300 after:w-full after:scale-x-0 after:hover:scale-x-100 after:transition after:duration-300 after:origin-left"
                }
                // Disable navigation when active
                aria-disabled={isPathActive && shouldNotBeActive}
                style={{
                    pointerEvents: isPathActive && shouldNotBeActive ? "none" : "auto",
                    opacity: isPathActive && shouldNotBeActive ? 0.5 : 1,
                }}
            >
                {children}
            </NavLink>
        </li>
    );
}