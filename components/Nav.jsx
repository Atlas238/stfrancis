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

    function setThemeCupcake() {
        let html = document.getElementById('html')
        html.setAttribute("data-theme", "cupcake")
    }
    function setThemeDark() {
        let html = document.getElementById('html')
        html.setAttribute("data-theme", "dark")
    }
    function setThemeRainbow() {
        let html = document.getElementById('html')
        html.setAttribute("data-theme", "pastel")
    }
    // Only show Nav if logged in
    if (!user) return null

    return (
        <div className="navbar bg-base-200 shadow-sm fixed z-10">
            <div className="flex-1">
                <NavLink className="btn btn-ghost normal-case text-xl" href={"/"}>Home</NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    {/* Render diff navlinks based on location variable */}
                    <li><NavLink href={"/checkedin"} className="btn btn-primary text-primary-content m-1">Checked In Clients</NavLink></li>
                    <div className="dropdown">
                        <label tabIndex={0} className="btn btn-secondary m-1">Theme</label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a onClick={setThemeCupcake}>Light</a></li>
                            <li><a onClick={setThemeDark}>Dark</a></li>
                            <li><a onClick={setThemeRainbow}>Rainbow</a></li>
                        </ul>
                    </div>
                    <li><a onClick={logout} className="btn btn-accent text-primary-content m-1">Logout</a></li>
                </ul>
            </div>
        </div>
    )
}