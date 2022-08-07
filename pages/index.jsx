
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import { parse, isDate } from 'date-fns'
import { userService } from '../services/user.service';

import Client from '../components/Client'

import * as Yup from 'yup'
import { useRouter } from 'next/router';

// Validation Schema
const clientLookupSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is: (value) => value?.length, then: (rule) => rule.length(1)}),
    dateOfBirth: Yup.date().transform(parseDateString).required()
}, ['middleInitial', 'middleInitial'])

// Utility Function
function parseDateString(value, originalValue) {
    const parsedDate = isDate(originalValue)
    ? originalValue
    : parse(originalValue, "yyyy-MM-dd", new Date())
    return parsedDate
}

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

    const [submitErrors, setSubmitErrors] = useState({
        firstName: null,
        lastName: null,
        middleInitial: null,
        dateOfBirth: null
    })

    const [touched, setTouched] = useState({
        firstName: false,
        lastName: false,
        middleInitial: false,
        dateOfBirth: false
    })

    // ***** FOR DEMO IF NEEDED, WEAK SIMULATION OF SQL LIKE STATEMENT
    const fakeLookup = async (data) => {
        // Intakes submitForm data param and uses that to query the super big old client list
        let sublist = []
        let clients = await require('../tempdata/Clients.json')
        clients.forEach((client) => {
            let searchClient = {
                firstName: data.firstName.toUpperCase(),
                lastName: data.lastName.toUpperCase(),
                birthdate: data.birthdate
            }
            let dbClient = {
                firstName: client.firstName.toUpperCase(),
                lastName: client.lastName.toUpperCase(),
                birthdate: client.birthdate
            }
            let reFirst = `^${searchClient.firstName[0]}.+`
            let searchFirstName = new RegExp(reFirst, 'g')

            if (dbClient.firstName.match(searchFirstName)) {
                sublist.push(dbClient)
            }
            
            let reLast = `^${searchClient.lastName[0]}.+`
            let searchLastName = new RegExp(reLast, 'g')
            if (dbClient.lastName.match(searchLastName)) {
                sublist.push(dbClient)
            }
        })

        let returnList = [...new Set(sublist)]

        setDbClients(returnList)
    }


    // Handled by YUP, sets any errors for custom display messages
    const submitForm = async (data) => {
        setSubmitErrors({
            firstName: null,
            lastName: null,
            middleInitial: null,
            dateOfBirth: null
        })
        setSubmitted(true)

        setLookupClient(data) //setLocally for easy tracking
        let res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientByInfo?firstName=${data.firstName}&lastName=${data.lastName}&birthdate=${data.dateOfBirth.toISOString().split("T")[0]}`)
        // let res = await fetch('/api/clients')
        let clients = await res.json()
        setDbClients(clients)
    }

    // Handled by YUP, transfers error from Yup to other state variable
    const handleError = (err) => {
        setSubmitErrors({
            firstName: err.firstName,
            lastName: err.lastName,
            middleInitial: err.middleInitial,
            dateOfBirth: err.dateOfBirth
        })

        // Assusmes that submit was clicked so all fields are changed to "touched"
        setTouched({
            firstName: true,
            lastName: true,
            middleInitial: true,
            dateOfBirth: true
        })
    }

    // Rather than submitting, takes field data and sends it to another form on a different page
    const newClient = (e) => {
        let basicInfo = {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            middleInitial: document.getElementById("middleInitial").value,
            dateOfBirth: document.getElementById("dateOfBirth").value
        }
        console.log(basicInfo)
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
                        <div className="form-control flex-row">

                            {/* First Name */}
                            <div className='p-2 w-60 flex flex-col'>
                            <label className="label label-text">First name</label>
                            <input id="firstName" type="text" name="firstName" {...register('firstName')} onClick={() => setTouched({...touched, firstName: true})} className="input input-bordered min-w-sm  bg-white border-gray-400 p-2" />
                            {submitErrors.firstName && touched.firstName ? <label className='label-text-alt badge badge-error m-1'>required</label> : null}
                            </div>

                            {/* Last Name */}
                            <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Last name</label>
                            <input id="lastName" type="text" name="lastName" {...register('lastName')} onClick={() => setTouched({...touched, lastName: true})} className="input input-bordered min-w-sm bg-white border-gray-400 p-2" />
                            {submitErrors.lastName && touched.lastName ? <label className="label-text-alt badge badge-error m-1">required</label> : null}
                            </div>

                            {/* Middle Initial */}
                            <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Middle Initial</label>
                            <input id="middleInitial" type="text" name="middleInitial" {...register('middleInitial')} onClick={() => setTouched({...touched, middleInitial: true})} className="input input-bordered min-w-sm bg-white border-gray-400 p-2" />
                            {submitErrors.middleInitial && touched.middleInitial ? <label className='label-text-alt badge badge-error'>Middle Initial must only be one letter</label> : null}
                            </div>

                            {/* Date of Birth */}
                            <div className="p-2 w-64 flex flex-col">
                                <label className="label label-text">Date of Birth</label>
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
            <div className={`${submitted ? "visible" : "hidden"} mx-auto container flex flex-row flex-wrap justify-center`}>
                {dbClients ? dbClients.map(client => { return <Client client={client} key={client.id} />}) : <></>}
            </div>

        </div>
    )
}