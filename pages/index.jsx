import { useState, useEffect } from 'react';

import { userService } from '../services/user.service';

import Client from '../components/Client'
import Loading from '../components/Loading';
import SearchForm from '../components/SearchForm';
import SearchError from '../components/SearchError';

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
        let stored = localStorage.getItem('lastClients')

        if (stored === undefined | stored === "undefined") {
            setLastClients(null)
        } else {
            setLastClients(JSON.parse(localStorage.getItem('lastClients')))
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

            {/* Saved clients from last search */}
            {lastClients ? <a 
                className='btn btn-primary' 
                onClick={()=>{ 
                    setLastClients(null) 
                    localStorage.setItem('lastClients', undefined)}
                    }>Clear</a> 
                    : null
            }
            <div className='mx-auto container flex flex-row flex-wrap justify-center'>
                {
               lastClients?.map((client) => {
                    return <Client key={client.clientID} client={client} />
                })
                }
            </div>
        </div>
    )
}