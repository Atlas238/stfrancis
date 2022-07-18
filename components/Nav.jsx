import { useState, useEffect } from "react";

import { NavLink } from './NavLink'
import { userService } from '../services/user.service'

export { Nav }

function Nav() {
    const [user, setUser] = useState(null)

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
                <NavLink className="btn btn-ghost normal-case text-xl" href={"/"}></NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><NavLink href={"/Testing"}>Testing</NavLink></li>
                    <li><NavLink href={"#"}>Item 2</NavLink></li>
                    <li><a onClick={logout}>Logout</a></li>
                </ul>
            </div>
        </div>
    )
}