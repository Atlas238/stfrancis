import styles from '../styles/NewClient.module.css'
export default function NewClientForm({ newClient, setNewClient }) {
    const handleSubmit = (e) =>
    {
        e.preventDefault()
        console.log('Submit recieved:' + newClient)
    }

    const handleChange = (e) =>
    {
        switch (e.target.name) 
        {
            case 'first':
                break;
            case 'last':
                break;
            case 'middle':
                break;
            case 'dobMonth':
                break;
            case 'dobDay':
                break;
            case 'dobYear':
                break;
            case 'zip':
                break;
            case 'race':
                break;
            case 'gender':
                break;
            case 'numFam':
                break;
        }
    }

    return (
        <main className={styles.main}>
            <form onSubmit={handleSubmit}>

                <label className={styles.name}>
                    Client Name:
                    <div>
                    <label>
                      First Name
                      <input name={'first'}></input>
                    </label>
                    <label>
                      Last Name
                      <input name={'last'}></input>
                    </label>
                    <label>
                      Middle Initial 
                      <input name={'middle'}></input>
                    </label> 
                    </div>
                </label>

                <label className={styles.dob}>
                    Date of Birth
                    <div className={styles.dobFields}>
                    <label>
                        Month:
                        <input name={'dobMonth'}></input>
                    </label>
                    <label>
                        Day:
                        <input name={'dobDay'}></input>
                    </label>
                    <label>
                         Year:
                        <input name={"dobYear"}></input>
                    </label>
                    </div>
                </label>

                <label className={styles.additional}>
                    Additional Details:
                    <div>
                        <label>
                          Zipcode:
                          <input name={"zip"}></input>
                        </label>

                        <label>
                          Race:
                          <input name={'race'}></input>
                        </label>

                        <label>
                          Gender:
                          <select>
                            <option value={'M'}>M</option>
                            <option value={'F'}>F</option>
                            <option value={'O'}>O</option>
                          </select>
                        </label>

                        <label>
                          Number of family members:
                          <input name={'numFam'}></input>
                        </label>
                    </div>
                </label>
            </form>
        </main>
    )
}