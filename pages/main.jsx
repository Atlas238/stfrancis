import { useState } from 'react'
import NewClientForm from '../components/NewClientForm'
import LookupForm from '../components/LookupForm'
import styles from '../styles/Home.module.css'
export default function Main() {

    // View Prop - Controls render
    const [view, setView] = useState('main')

    // New Client Prop
    const [newClient, setNewClient] = useState({
        firstName: "",
        lastName: "",
        middleInitial: "",
        dobMonth: 1,
        dobDay: 1,
        dobYear: 1900,
        zipcode: 123456,
        race: '',
        gender: '',
        numInFamily: 0
    })

    const logout = (e) => 
    {
       // Wipe localstorage volunteer code, return to login page
       localStorage.clear()
       window.location = '/'
    }

    // Renders Options based on view prop
    const renderView = (view) => 
    {
        switch (view) 
        {
            case 'main':
                return (
                    <main>
                        <button onClick={()=>{ setView('add') }}>Add a new Client</button>
                        <button onClick={()=>{ setView('lookup') }}>Look up an existing Client</button>
                    </main>
                )
            case 'add':
                return (
                    <>
                        <NewClientForm newClient={newClient} setNewClient={setNewClient}/>
                        <button onClick={()=>{ setView('main') }}>Back</button>
                    </>
                )
            
            case 'lookup':
                return (
                    <>
                        <LookupForm />
                        <button onClick={()=>{ setView('main') }}>Back</button>
                    </>
                )
        }
    }

    return (
        <div className={styles.container}>

            <h2>User: Test</h2>

            <header>
                <p>What would you like to do?</p>
            </header>

            {renderView(view)}

            <footer>
                <button onClick={logout}>Log out</button>
            </footer>
        </div>
    )
}