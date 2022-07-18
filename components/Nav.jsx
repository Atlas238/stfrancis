import { useState, useEffect } from "react";

import { NavLink } from './NavLink'
import { userService } from '../services/user.service'

export { Nav }

function Nav() {
    const [user, setUser] = useState(null)
    const [location, setLocation] = useState(null)

    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x))
        return () => subscription.unsubscribe()
    }, [])

    function logout() {
        userService.logout()
    }

    // Only show Nav if logged in
    if (!user) return null

    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <NavLink className="btn btn-ghost normal-case text-xl" href={"/"}>Home</NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {/* Render diff navlinks based on location variable */}
                    <li><NavLink href={"/checkin"}>Check In</NavLink></li>
                    <li><NavLink href={"/checkout"}>Check Out</NavLink></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}