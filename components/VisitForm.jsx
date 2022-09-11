import { useForm } from 'react-hook-form'
import * as Yup from 'yup'


export default function VisitForm({ id }) {
    return (
        <form onSubmit={handleSubmit}>
            <label>Visit Date</label>
            <input id="visitDate" type={'date'} />
            <label>Clothing</label>
            <input id="clothing" type={'text'} />
            <label>Household</label>
            <input id="household" type={'text'} />
            <label>Special Requests</label>
            <input id="specialRequests" type={'text'}/>
            <button type="submit" className="btn btn-primary">Add Visit</button>
        </form>
    )
}