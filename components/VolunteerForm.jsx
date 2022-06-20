import { useState } from 'react'
export default function VolunteerForm({ volunteer, setVolunteer }) {
    const [error, setError] = useState(false)
    const handleSubmit = (e) => 
    {
        e.preventDefault()
        console.log('Submit recieved:' + volunteer.code)
        // If valid login code move to logged in page

        if (volunteer.code == 123) {
            setError(false)
            // Move to main
            window.localStorage.setItem('code', volunteer.code)
            window.location = '/main'
        }

        // Else reset form, render error text
        setVolunteer({
            ...volunteer,
            code: 0
        })
        setError(true)
    }
    const handleChange = (e) =>
    {
        e.preventDefault()
        setVolunteer({
            ...volunteer,
            code: e.target.value
        })
    }
    const clearField = (e) =>
    {
        e.preventDefault()
        setVolunteer({
            ...volunteer,
            code: ''
        })
    }
    return (
        <form onSubmit={handleSubmit}>
            <label>
                User Code: 
                <input type={'text'} value={volunteer.code} onClick={clearField} onChange={handleChange} placeholder={1020} />
            </label>
            <button type={"submit"}>Login</button>
            { error ? <p>Invalid Code, please try again</p> : null}
        </form>
    )
}