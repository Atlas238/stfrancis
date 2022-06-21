import { useState } from 'react'
import styles from '../styles/Lookup.module.css'
export default function LookupForm() {

    const [client, setClient] = useState({
        lastName: '',
        dobMonth: 1,
        dobDay: 1,
        dobYear: 1900
    })

    const handleSubmit = (e) => 
    {
        e.preventDefault()
        console.log('Client data submitted: ' + client.lastName)
        console.log(client.dobMonth + "/" + client.dobDay + "/" + client.dobYear)
    }

    const handleChange = (e) =>
    {
        e.preventDefault()
        switch (e.target.name)
        {
            case 'last':
                setClient({
                    ...client,
                    lastName: e.target.value
                })
                break;
            case 'month':
                setClient({
                    ...client,
                    dobMonth: e.target.value
                })
                break;
            case 'day':
                setClient({
                    ...client,
                    dobDay: e.target.value
                })
                break;
            case 'year':
                setClient({
                    ...client,
                    dobYear: e.target.value
                })
                break;
        }
    }

    return (
        <main>
            {/* Lookup Form */}
            <form className={styles.form} onSubmit={handleSubmit}>

                <h2>Client Lookup</h2>

                <label>
                    Last Name
                    <input name={'last'}></input>
                </label>

                <label>
                    Date of Birth
                    <div>
                        <label>
                          Month:
                          <input name={'month'}type={'number'} onChange={handleChange}></input>
                        </label>
                        <label>
                          Day:
                          <input name={'day'} type={'number'} onChange={handleChange}></input>
                        </label>
                        <label>
                          Year:
                          <input name={"year"} type={'number'} onChange={handleChange}></input>
                        </label>
                    </div>
                </label>

                <button>Search</button>
            </form>

            <section>
            {/* Client Data */}

            </section>
        </main>
    )
}