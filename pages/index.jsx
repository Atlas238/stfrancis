import { useState, useEffect } from 'react';
import { BallTriangle } from 'react-loader-spinner'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { userService } from '../services/user.service';

import Client from '../components/Client'

import * as Yup from 'yup'
import { useRouter } from 'next/router';

// Validation Schema
const clientLookupSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is: (value) => value?.length, then: (rule) => rule.length(1)}),
    dateOfBirth: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {excludeEmptyString: true}),
}, ['middleInitial', 'middleInitial'])


// Main Landing Page
export default function Home() {
    const router = useRouter()

    const { register, handleSubmit } = useForm({
        resolver: yupResolver(clientLookupSchema)
    })

    // Bunch of State Variables
    const [users, setUsers] = useState(null)
    const [lookupClient, setLookupClient] = useState(null)
    const [dbClients, setDbClients] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

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
        setLookupClient(data) //setLocally for easy tracking
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

    // Rather than submitting, takes field data and sends it to another form on a different page
    const newClient = (e) => {
        let basicInfo = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            dateOfBirth: document.getElementById("dateOfBirth").value
        }
        localStorage.setItem('partialClient', JSON.stringify(basicInfo))
        
        router.push('/newclient')
    }

    // Subscribes to the loggedin user
    useEffect(() => {
        const subscription = userService.user.subscribe(x => setUsers(x));
        return () => subscription.unsubscribe()
    }, []);

    return (
        <div className="flex flex-col min-w-full min-h-screen overflow-x-hidden">
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

            {/* Render Client list - Select desired Client + Check them in */}
            <div className={`${loading ? "visible" : "hidden"} mx-auto`}><BallTriangle color="#000000" height={100} width={100} timeout={3000} /></div>
            <div className={`${submitted ? "visible" : "hidden"} mx-auto container flex flex-row flex-wrap justify-center`}>
                {dbClients?.length > 0 ? dbClients.map(client => { return <Client client={client} key={client.clientID} />}) : <div className={`flex flex-col ${loading ? "hidden" : 'visible'}`}><h3 className='text-3xl text-center p-4'>Whoops!</h3><p className="text-xl">Looks like we couldn't find anyone... Check the information entered and please try again!</p></div>}
            </div>

        </div>
    )
}