
import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';

export default Home;

function Home() {
    const [users, setUsers] = useState(null);

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <div className="grid grid-cols-3">
            <div className='col-span-2'>

            </div>
            <div>
                <button className="btn btn-primary"></button>
                <button className='btn btn-primary'></button>
                <button className='btn btn-primary'></button>
            </div>
        </div>
    );
}
