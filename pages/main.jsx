import styles from '../styles/Home.module.css'
export default function Main() {

    const logout = (e) => 
    {
       // Wipe localstorage volunteer code
       localStorage.clear()
       window.location = '/'
    }

    return (
        <div className={styles.container}>

            <h2>User: Test</h2>

            <header>
                <p>What would you like to do?</p>
            </header>

            <main>
                <button>Add a new Client</button>
                <button>Look up an existing Client</button>
            </main>

            <footer>
                <button onClick={logout}>Log out</button>
            </footer>
        </div>
    )
}