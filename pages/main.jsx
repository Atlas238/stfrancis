import { useState } from 'react'

export default function Main({ clientsData }) {

    // View Prop - Controls render
    const [view, setView] = useState('main')

    const logout = (e) => 
    {
       // Wipe localstorage volunteer code, return to login page
       localStorage.clear()
       window.location = '/'
    }

    return (
        <div>

            <h2>User: Test</h2>

            <header>
                <p>What would you like to do?</p>
            </header>

            <footer>
                <button onClick={logout}>Log out</button>
            </footer>
        </div>
    )
}

// export async function getStaticProps(context)
// {
//     // HUUUGE! Thus why we use a DB (: keep commented out if you dont wanna freeze things
//     let clientsData = await require('../tempdata/Clients.json')

//     return {
//         props: { clientsData }
//     }
// }