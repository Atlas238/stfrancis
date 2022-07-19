
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
        <div className="flex min-w-full min-h-screen border-red-500 border-2">
                <form className={"card card-bordered mx-auto my-auto flex flex-col w-8/12"} method="post" action="/api/lookup" autoComplete="off">
                    <label className={"label"}>
                        <span className={"label-text text-lg"}>Client First Name</span>
                    </label>
                    <input type={"text"} name={"firstName"} className={"input input-bordered w-full "}/>

                    <label className={"label"}>
                        <span className='label-text text-lg'>Client Last Name</span>
                    </label>
                    <input type={"text"} name={"lastName"} className={"input input-bordered w-full "}/>

                    <label className={"label"}>
                        <span className={"label-text text-lg"}>Client Birthdate</span>
                    </label>
                    <input type={"date"} name={"birthday"} className={"input input-bordered w-full text-lg"}/>

                    <button type={"submit"} className={"btn btn-primary"}>Search</button>
                </form>
        </div>
    );
}