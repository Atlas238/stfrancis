import { useRouter } from "next/router"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

// form validation
const clientSchema = Yup.object().shape({
    firstName: Yup.string().required('*'),
    lastName: Yup.string().required('*'),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is:(value) => value?.length, then:(rule) => rule.length(1)}),
    dateOfBirth: Yup.date().required('*').nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
    gender: Yup.string().notRequired(),
    race: Yup.string().notRequired(),
    postalCode: Yup.string().matches(/^\d{5}(?:[- ]?\d{4})?$/, {excludeEmptyString: true, message: '* wrong format'}),
    familyId: Yup.string().notRequired()
},
// add cyclic dependencies for requiring itself
[['middleInitial', 'middleInitial'],['postalCode', 'postalCode']]);

// Fetch client data by id
export async function getServerSideProps({params}) {
    const res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientVisits?clientID=${params.id}`)
    const data = await res.json()
    return { props: { data } }
}

// Main Page to add a new Form
export default function updateclient({ data }) {

    const router = useRouter()
    const { id } = router.query
    const [client, setClient] = useState(null)
    const [updateClient, setUpdateClient] = useState(null)
    const { register, handleSubmit, reset, formState } = useForm({
        resolver: yupResolver(clientSchema)
    });
    const {errors} = formState;
    

    const submitForm = (updateClient) => {
        console.log(updateClient)
        setUpdateClient(updateClient) //save in submit function so we can CALL submitForm in second button, but use data from state in other function (ie go to checkin)

        // ADD ROUTE

    }

    const checkinClient = () => {
        console.log(updateClient) //save to localstorage somehow?
        // let currentCheckedIn = JSON.parse(localStorage.getItem("checkedInClients") === null || undefined ? {} : localStorage.getItem('checkedInClients'))
    }

    // fill fields with current profile
    const fillFieldswithProfile = (profile) => {
        document.getElementById('firstName').value = profile.firstName
        document.getElementById('lastName').value = profile.lastName
        document.getElementById('middleInitial').value = profile.middleInitial
        document.getElementById('dateOfBirth').valueAsDate = new Date(profile.birthday)
        document.getElementById('gender').value = profile.gender === 'N/A' ? '' : profile.gender
        document.getElementById('race').value = profile.race === 'N/A' ? '' : profile.race
        document.getElementById('postalCode').value = profile.zipCode === 'N/A' ? '' : profile.zipCode
    }

    useEffect(() => {
        
        if(data.length !== 0) {
            fillFieldswithProfile(data[0])
        }
        // reset form with client data
        reset(client)
    }, [])

    return (
        <div className="flex flex-col min-w-full min-h-screen overflow-x-hidden">
            <form onSubmit={handleSubmit(submitForm)} className="card mt-28 mx-auto">
                <div className='card-body min-w-full'>
                    <h1 className='card-title my-0'>Update Client Form</h1>
                    <div className='divider my-0'></div>
                    <div className="form-control flex-row grid grid-cols-4 gap-4">

                        {/* First Name */}
                        <div className='p-2 w-60 flex flex-col'>
                        <label className="label label-text">First name <span className="text-orange-700">{errors.firstName?.message}</span></label>
                        <input id="firstName" type="text" name="firstName" {...register('firstName')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Last Name */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text">Last name <span className="text-orange-700">{errors.lastName?.message}</span></label>
                        <input id="lastName" type="text" name="lastName" {...register('lastName')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Middle Initial */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text">Middle Initial</label>
                        <input id="middleInitial" type="text" name="middleInitial" {...register('middleInitial')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Date of Birth */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Date of Birth  <span className="text-orange-700">{errors.dateOfBirth?.message}</span></label>
                            <input id="dateOfBirth" type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" className="input input-bordered min-w-sm p-2 text-center"></input>
                        </div>

                        {/* Gender */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Gender</label>
                            <select id="gender" name="gender" {...register('gender')} className="select select-bordered min-w-sm p-2 text-center">
                                <option defaultValue value="">(Optional)</option>
                                <option>F</option>
                                <option>M</option>
                                <option>X</option>
                            </select>
                        </div>

                        {/* Race */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Race</label>
                            <select id="race" name="race" {...register('race')} className="select select-bordered min-w-sm p-2 text-center">
                                <option defaultValue value="">(Optional)</option>
                                <option>American Indian or Alaska Native</option>
                                <option>Asian</option>
                                <option>Black or African American</option>
                                <option>Native Hawaiian or Other Pacific Islander</option>
                                <option>Hispanic or Latino</option>
                                <option>White</option>
                                <option>Other</option>
                            </select>
                        </div>

                        {/* Zip Code */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Postal code <span className="text-orange-700">{errors.postalCode?.message}</span></label>
                            <input id="postalCode" type="text" name="postalCode" {...register('postalCode')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Family */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text">Family Id</label>
                            <input id="familyId" type="text" name="familyId" {...register('familyId')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                    </div>
                    <div className='card-actions justify-center my-0 py-8'>
                        <button type="submit" className="btn btn-wide btn-secondary p-2 my-2 m-8">Update</button>
                        <button onClick={()=> { submitForm(); checkinClient() }} className="btn btn-wide btn-secondary p-2 my-2 m-8">Update and Checkin</button>
                    </div>
                    <div className='divider my-0'></div>
                </div>
            </form>
        </div>
    )
}
