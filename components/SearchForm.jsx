import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"

import { useState } from 'react'
import { useForm } from "react-hook-form"

const clientLookupSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is: (value) => value?.length, then: (rule) => rule.length(1)}),
    dateOfBirth: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {excludeEmptyString: true}),
}, ['middleInitial', 'middleInitial'])

export default function SearchForm({ setDbClients, setSubmitted, setLoading }) {
    // State Variables
    const [submitErrors, setSubmitErrors] = useState({
        firstName: null,
        lastName: null,
        dateOfBirth: null
    })
    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        dateOfBirth: false
    })

    // Form Functions
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(clientLookupSchema)
    })

    // Handled by YUP, sets any errors for custom display messages
    const submitForm = async (data) => {
        setDbClients(null)
        setSubmitted(false)
        console.log("Form Submitted")
        setLoading(true)
        setSubmitErrors({
            firstName: null,
            lastName: null,
            dateOfBirth: null
        })
        setSubmitted(true)
        let res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientByInfo?firstName=${data.firstName}&lastName=${data.lastName}&birthdate=${data.dateOfBirth}`)
        // let res = await fetch('/api/clients')
        let clients = await res.json()
        if (clients.length != 0) setDbClients(clients)
        console.log(clients)
        setLoading(false)
    }   

    // Handled by YUP, transfers error from Yup to other state variable
    const handleError = (err) => {
        setSubmitErrors({
            firstName: err.firstName,
            lastName: err.lastName,
            dateOfBirth: err.dateOfBirth
        })

        // Assusmes that submit was clicked so all fields are changed to "touched"
        setTouched({
            firstName: true,
            lastName: true,
            dateOfBirth: true
        })
    }

    // Utility Function - Saves partial Client and moves to newclient page
    const newClient = (e) => {
        let basicInfo = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            dateOfBirth: document.getElementById("dateOfBirth").value
        }
        localStorage.setItem('partialClient', JSON.stringify(basicInfo))
        
        router.push('/newclient')
    }

    return (
        <form onSubmit={handleSubmit(submitForm, handleError)} className="card mt-28 mx-auto">
            <div className='card-body min-w-full'>
                <h1 className='card-title text-sfgold ld my-0'>Lookup Client</h1>
                <div className='divider my-0'></div>
                <div className="form-control flex-col">
                    <div className="flex flex-row">
                        {/* First Name */}
                        <div className='p-2 w-60 flex flex-col'>
                            <label className="label label-text text-xl">First name</label>
                            <input id="firstName" type="text" name="firstName" {...register('firstName')} onClick={() => setTouched({...touched, firstName: true})} className="input input-bordered min-w-sm  bg-white border-gray-400 p-2" />
                            {submitErrors.firstName && touched.firstName ? <label className='label-text-alt badge badge-error m-1'>required</label> : null}
                        </div>

                        {/* Last Name */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Last name</label>
                            <input id="lastName" type="text" name="lastName" {...register('lastName')} onClick={() => setTouched({...touched, lastName: true})} className="input input-bordered min-w-sm bg-white border-gray-400 p-2" />
                            {submitErrors.lastName && touched.lastName ? <label className="label-text-alt badge badge-error m-1">required</label> : null}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="p-2 w-64 flex flex-col self-center">
                        <label className="label label-text text-xl">Date of Birth</label>
                            <input id="dateOfBirth" type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" onClick={() => setTouched({...touched, dateOfBirth: true})} className="input input-bordered min-w-sm  bg-white border-gray-400 p-2" />
                            <label className={`label-text-alt badge badge-error m-1 ${submitErrors.dateOfBirth && touched.dateOfBirth ? "visible" : "hidden"}`}>required</label>
                    </div>
                </div>
                
                <div className='card-actions justify-end my-0'>
                    <button type="submit" className="btn btn-primary p-2 my-2 mr-1">Search</button>
                    <button type="button" className="btn btn-primary p-2 my-2 mr-1" onClick={newClient}>New Client</button>
                </div>
                <div className='divider my-0'></div>
            </div>
        </form>
    )
}