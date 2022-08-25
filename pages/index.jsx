import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';

import Client from '../components/Client'
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import SearchError from '../components/SearchError';
import { render } from 'react-dom';

// Main Landing Page
export default function Home() {

    // State Variables
    const [users, setUsers] = useState(null)
    const [dbClients, setDbClients] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [lastClients, setLastClients] = useState(null)
    const [loading, setLoading] = useState(false)

    // Subscribes to the loggedin user
    useEffect(() => {
        if (localStorage.getItem('lastClients') != undefined) {
            setLastClients(JSON.parse(localStorage.getItem('lastClients')))
        } else {
            setLastClients(null)
        }
        let history = JSON.parse(localStorage.getItem('history'))
        if (history.length > 3) {
            history = history.splice(1, 3)
            localStorage.setItem('history', JSON.stringify(history))
        }
        if (history[0] === '/' && history[1] === '/' && history[2] === '/') {
            console.log('here')
            setLastClients(null)
            localStorage.setItem('lastClients', undefined)
        }
        

        const subscription = userService.user.subscribe(x => setUsers(x));
        return () => subscription.unsubscribe()
    }, []);

    return (
        <div className="flex flex-col min-w-full min-h-screen overflow-x-hidden">

            <SearchForm 
                setDbClients={setDbClients} 
                setSubmitted={setSubmitted} 
                setLastClients={setLastClients}
                setLoading={setLoading}
            />

            {/* Render Client list - Select desired Client + Check them in */}
            <Loading loading={loading} />

            <div className={`${submitted ? "visible" : "hidden"} mx-auto container flex flex-row flex-wrap justify-center`}>
                {dbClients?.length > 0 ? 
                    dbClients.map((client) => { 
                        return <Client key={client.clientID} client={client} />
                    }) 
                : 
                <SearchError loading={loading} />
                }
            </div>
            <div className='mx-auto container flex flex-row flex-wrap justify-center'>

               {
               JSON.parse(localStorage.getItem('history'))[-0] === JSON.parse(localStorage.getItem('history'))[-1]  ?
               <></>
               :
               lastClients?.map((client) => {
                    return <Client key={client.clientID} client={client} />
                })}
            </div>
        </div>
    )
}