import * as Yup from 'yup'
import { RiSearchLine } from 'react-icons/ri'
import { yupResolver } from "@hookform/resolvers/yup"
import { useRouter } from "next/router"

import { useState } from 'react'
import { useForm } from "react-hook-form"

const clientLookupSchema = Yup.object().shape({
    firstName: Yup.string(),
    lastName: Yup.string(),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is: (value) => value?.length, then: (rule) => rule.length(1)}),
    dateOfBirth: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {excludeEmptyString: true}),
}, ['middleInitial', 'middleInitial'])

export default function SearchForm({ setDbClients, setSubmitted, setLoading, setLastClients, settings }) {
    const router = useRouter()
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
        setLastClients(null)
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
        let clients = await res.json()

        if (clients.length != 0 && clients.length < 500) {
            clients.forEach((client) => {
                if (client.firstName && client.lastName) {
                    client.firstName = client.firstName.toLowerCase()
                    client.firstName = client.firstName[0].toUpperCase() + client.firstName.slice(1)
                    client.lastName = client.lastName.toLowerCase()
                    client.lastName = client.lastName[0].toUpperCase() + client.lastName.slice(1)
                }

                setEligibleItems(client)

                if (client.visits) {
                    let clientsLastVisit = new Date(client?.visits[0]?.visitDate)
                    const diffDays = getDateDifference(new Date(Date.now()), clientsLastVisit)
                    if (diffDays < settings.daysEarlyThreshold) {
                        client.isEarly = true
                        client.daysEarly = diffDays
                    } else {
                        client.isEarly = false
                    }    
                } else {
                    client.isEarly = false
                }
            })
            setDbClients(clients)

            if (clients.length < 100) {
                localStorage.setItem('lastClients', JSON.stringify(clients))
            } else {
                let firstPage = clients.slice(0, 100)
                localStorage.setItem('lastClients', JSON.stringify(firstPage))
            }

        } else {
            //List was soo long we say we couldnt find anyone...
            setDbClients(null)

        }
        if (clients.length < 100) {
            localStorage.setItem('lastClients', JSON.stringify(clients))
        } else {
            let firstPage = clients.slice(0, 100)
            localStorage.setItem('lastClients', JSON.stringify(firstPage))
        }

        setLoading(false)

        // Can move or change?
        document.getElementById('firstName').value = ""
        document.getElementById('lastName').value = ""
        document.getElementById('dateOfBirth').value = ""
    }   

    function setEligibleItems(client) {
        let today = new Date(Date.now())
        client.eligibleItems = []

            if (client.mostRecentBackpack != null || client.mostRecentBackpack != undefined) {
                let lastBackpack = new Date(client.mostRecentBackpack.split('T')[0])
                let daysDiff = getDateDifference(today, lastBackpack)
                if (daysDiff > settings.backpackThreshold) {
                    client.eligibleItems.push('Backpack')
                }
            } else {
                client.eligibleItems.push('Backpack')
            }

            if (client.mostRecentSleepingBag != null || client.mostRecentSleepingBag != undefined) {
                let lastSleepingBag = new Date(client.mostRecentSleepingBag.split('T')[0])
                let diffDays = getDateDifference(today, lastSleepingBag)
                if (diffDays > settings.sleepingbagThreshold) {
                    client.eligibleItems.push('Sleeping Bag')
                }
            } else {
                client.eligibleItems.push('Sleeping Bag')
            }
    }

    function getDateDifference(rightNow, compareDate) {
        let diff = Math.abs(rightNow - compareDate)
        let daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24))
        return daysDiff
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
    const newClient = () => {
        router.push('/newclient')
    }

    return (
        <form onSubmit={handleSubmit(submitForm, handleError)} className="card mt-28">
            <div className='card-body min-w-full'>
                <h1 className='card-title font-light text-3xl my-0 select-none'>Lookup Client</h1>
                <div className='divider my-0'></div>
                <div className="form-control flex-row  justify-center">
                    <div className="flex flex-row">
                        {/* First Name */}
                        <div className='p-2 w-60 flex flex-col'>
                            <label className="label label-text text-2xl">First name</label>
                            <input id="firstName" type="text" name="firstName" {...register('firstName')} onClick={() => setTouched({...touched, firstName: true})} className="input input-bordered min-w-sm  bg-white border-gray-400 p-2" />
                            {submitErrors.firstName && touched.firstName ? <label className='label-text-alt badge badge-error m-1'>required</label> : null}
                        </div>

                        {/* Last Name */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-2xl">Last name</label>
                            <input id="lastName" type="text" name="lastName" {...register('lastName')} onClick={() => setTouched({...touched, lastName: true})} className="input input-bordered min-w-sm bg-white border-gray-400 p-2" />
                            {submitErrors.lastName && touched.lastName ? <label className="label-text-alt badge badge-error m-1">required</label> : null}
                        </div>
                    </div>

                    {/* Date of Birth */}
                    <div className="p-2 w-64 flex flex-col self-center">
                        <label className="label label-text text-2xl">Date of Birth</label>
                            <input id="dateOfBirth" type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" onClick={() => setTouched({...touched, dateOfBirth: true})} className="input input-bordered min-w-sm  bg-white border-gray-400 p-2" />
                            <label className={`label-text-alt badge badge-error m-1 ${submitErrors.dateOfBirth && touched.dateOfBirth ? "visible" : "hidden"}`}>required</label>
                    </div>
                </div>
                
                <div className='card-actions justify-end my-0'>
                    <button type="submit" className="btn btn-primary p-2 my-2 mr-5 font-thin text-lg transition-all hover:scale-125 hover:transition-all"><RiSearchLine /></button>
                    <button type="button" className="btn btn-primary p-2 my-2 mr-1 font-thin text-lg transition-all hover:transition-all" onClick={newClient}>New Client</button>
                </div>
                <div className='divider my-0'></div>
            </div>
        </form>
    )
}