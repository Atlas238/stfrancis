import { useState, useEffect } from "react";

import { RiSettings4Line } from 'react-icons/ri'

import { NavLink } from './NavLink'
import Image from "next/image";
import { userService } from '../services/user.service'

import logo from '../public/sfhlogo.png'

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

    // Only show Nav if logged in - can be done in any page or component as long as you copy useEffect + user state variable
    if (!user) return null

    return (
        <div className="navbar bg-base-200 shadow-sm h-28 fixed z-50 hide">
            <div className="flex-1">
                <NavLink href={"/"} className="btn btn-ghost h-24"><Image src={logo} width={200} height={90} priority={true} /></NavLink>
            </div>
            <div className="flex-none">
                <ul className="menu menu-horizontal p-0">
                    <li><NavLink href={"/checkedin"} className="btn btn-primary text-xl text-primary-content font-thin m-2 mt-7">Checked In Clients</NavLink></li>
                    <li><a onClick={logout} className="btn btn-accent text-xl text-primary-content font-thin m-2 mt-7">Logout</a></li>
                </ul>
                <NavLink href={"/settings"} className="fixed top-2 right-2 opacity-60 hover:opacity-100 hover:cursor-pointer hover:rotate-180 hover:scale-125 transition-all" ><RiSettings4Line /></NavLink>
            </div>
        </div>
    )
}