
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
        <div className="gap-5 columns-2xs">
            <div>
                <div class="absolute inset-y-5 right-5">
                <NavLink href= "/index" className="btn rounded-full bg-red-500 border-red-600 hover:bg-red-700">Back</NavLink>
                <button className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Reprint Receipts</button>
                <button className="btn rounded-full bg-blue-500 border-blue-600 hover:bg-blue-700">Sign Out</button>
                </div>
            </div>
        </div>
        
    );
}
