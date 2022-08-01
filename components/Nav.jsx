import { useState, useEffect } from "react";

import { NavLink } from './NavLink'
import { userService } from '../services/user.service'
import themes from "daisyui/src/colors/themes";

export { Nav }

function Nav() {
    const [user, setUser] = useState(null)
    
    // Subscribes to the loggedin user via userService
    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUser(x))
        return () => subscription.unsubscribe()
    }, [])

    // Logs a user out via userService
    function logout() {
        userService.logout()
    }

    // Sets the theme
    function setThemeDark() {
        let html = document.getElementById('html')
        html.setAttribute("data-theme", "dark")
    }
    

    // Only show Nav if logged in - can be done in any page or component as long as you copy useEffect + user state variable
    if (!user) return null

    return (
        <div className="navbar bg-base-200 shadow-sm fixed z-10 h-28">
            <div className="flex-1">
                <NavLink href={"/"} className="btn btn-secondary h-24"><span><img src={"./sfhlogo.png"} className="w-28" /></span>Home</NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><NavLink href={"/checkedin"} className="btn btn-primary text-primary-content hover:bg-bluegray m-1">Checked In Clients</NavLink></li>
                    <li><a onClick={logout} className="btn btn-accent text-primary-content  m-1">Logout</a></li>
                </ul>
            </div>
        </div>
    )
}
mytheme.extend.color