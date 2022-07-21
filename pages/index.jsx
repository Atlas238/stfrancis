
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';

import { userService } from '../services/user.service';

import Client from '../components/Client'

import * as Yup from 'yup'

const clientLookupSchema = Yup.object().shape({
    firstName: Yup.string().required(),
    lastName: Yup.string().required(),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is: (value) => value?.length, then: (rule) => rule.length(1)}),
    dateOfBirth: Yup.date().required()
}, ['middleInitial', 'middleInitial'])

export default function Home() {

    const { register, handleSubmit, errors } = useForm({
        resolver: yupResolver(clientLookupSchema)
    })

    const [users, setUsers] = useState(null)
    const [client, setClient] = useState(null)
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [progVal, setProgVal] = useState(5)

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

    const submitForm = (data) => {
        console.log(data)
        setSubmitted(true)
        setLoading(true)
        setClient(data)
    }

    const handleError = (err) => {
        setSubmitErrors({
            firstName: err.firstName,
            lastName: err.lastName,
            middleInitial: err.middleInitial,
            dateOfBirth: err.dateOfBirth
        })

        setTouched({
            firstName: true,
            lastName: true,
            middleInitial: true,
            dateOfBirth: true
        })
    }

    useEffect(() => {
        userService.getAll().then(x => setUsers(x));
    }, []);

    return (
        <div className="flex min-w-full min-h-screen overflow-x-hidden">
            {submitted && loading
            ? 
            <div className='my-auto mx-auto mt-20'>
                <Client client={client}/>
                <div className="my-auto mx-auto mt-80">Loading...</div> 
            </div>
            :
            <form onSubmit={handleSubmit(submitForm, handleError)} className="px-40 py-4 my-20">
                <div className="card bg-base-100 shadow-xl">
                    <div className='card-body'>
                        <h1 className='card-title text-primary-content'>Lookup Client</h1>
                            <div className='flex'>

                                {/* First Name */}
                                <div className="">
                                <label className="block font-bold text-primary-content">First name</label>
                                <input type="text" name="firstName" {...register('firstName')} onClick={() => setTouched({...touched, firstName: true})} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                {submitErrors.firstName && touched.firstName ? <p className='badge badge-error'>First Name is required</p> : null}
                                </div>

                                {/* Last Name */}
                                <div className="">
                                <label className="block font-bold text-primary-content">Last name</label>
                                <input type="text" name="lastName" {...register('lastName')} onClick={() => setTouched({...touched, lastName: true})} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                {submitErrors.lastName && touched.lastName ? <p className="badge badge-error">Last Name is required</p> : null}
                                </div>
                                {/* Middle Initial */}
                                <div className="col-span-9 sm:col-span-3">
                                <label className="block font-bold text-primary-content">Middle Initial</label>
                                <input type="text" name="middleInitial" {...register('middleInitial')} onClick={() => setTouched({...touched, middleInitial: true})} className="flex-1 w-1/3 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                                {submitErrors.middleInitial && touched.middleInitial ? <p className='badge badge-error'>Middle Initial must only be one letter</p> : null}
                                </div>
                            </div>
                            {/* Date of Birth */}
                            <div className="col-span-9 sm:col-span-3">
                                <label className="block font-bold text-primary-content">Date of Birth</label>
                                <input type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" onClick={() => setTouched({...touched, dateOfBirth: true})} className="flex-1 min-w-fit w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"></input>
                                {submitErrors.dateOfBirth && touched.dateOfBirth ? <p className='badge badge-error'>Date of Birth is required</p> : null}
                            </div>
                    </div>
                    <div className="card-actions justify-center p-4">
                        <button type="submit" className="btn btn-primary p-2">Search</button>
                    </div>
                </div>
            </form>
            }
        </div>
    )
}