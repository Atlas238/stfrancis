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
        <nav className="navbar bg-base-100 min-h-full z-50">
            <div className="flex-1">
                <NavLink href="/" exact className="btn btn-ghost normal-case text-xl">Home</NavLink>
            </div>
            <div className="flex-none gap-2">
                <div className="form-control">
                    <input type="text" placeholder="Search for Client" className="input input-bordered" />
                </div>
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img src="https://placeimg.com/80/80/people" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52">
                        <li><a className="justify-between" onClick={logout}>Logout</a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}