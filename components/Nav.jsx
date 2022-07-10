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
        <nav className="navbar">
            <div className="navbar-nav">
                <NavLink href="/" exact className="nav-item nav-link">Home</NavLink>
                <a onClick={logout} className="nav-item">Logout</a>
            </div>
        </nav>
    )
}