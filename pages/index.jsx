
import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';
import {NavLink} from '../components/NavLink.jsx';

export default Home;

function Home() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <main class="flex min-w-full min-h-screen border-red-500 border-2">
            <div>
                <div class="absolute top-50 right-0 flex col-span-2 gap-1 border-purple-700 border-2">
                    <div class="grid grid-cols-2"> 
                        <div class= "flex flex-col justify-end row-span-2 gap-1 border-gray-600 border-2">
                            <NavLink href= "#" className="btn rounded-full bg-red-500 border-red-600 hover:bg-red-700">Back</NavLink>
                            <NavLink href= "/requests" className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Requests</NavLink>
                            <button className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Reprint Receipts</button>
                        </div>
                        <div class="flex flex-col justify-end row-span-2 gap-1 border-green-600 border-2">
                            <NavLink href="/assistance" className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Assistance</NavLink>
                            <NavLink href="/donations" className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Donations</NavLink>
                            <button className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}