import { NavLink } from '../components/NavLink.jsx';
import {useRouter} from "next/router"
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';

// form validation
const clientSchema = Yup.object().shape({
    firstName: Yup.string().required('*'),
    lastName: Yup.string().required('*'),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is:(value) => value?.length, then:(rule) => rule.length(1)}),
    // dateOfBirth: Yup.date().required('*').nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
    dateOfBirth: Yup.string().matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/, {excludeEmptyString: true, message: '* wrong format'}),
    gender: Yup.string().notRequired(),
    race: Yup.string().notRequired(),
    postalCode: Yup.string().matches(/^\d{5}(?:[- ]?\d{4})?$/, {excludeEmptyString: true, message: '* wrong format'}),
    familySize: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null)
},
// add cyclic dependencies for requiring itself
[['middleInitial', 'middleInitial'],['postalCode', 'postalCode']]);

// Main Page to add a new Form
export default function newclient() {

    const router = useRouter()

    const [newClient, setNewClient] = useState(null)
    const [goToCheckin, setGoToCheckin] = useState(false)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema)
    });

    const {errors} = formState;

    const submitForm = async (data) => {
        setNewClient(data) //save in submit function so we can CALL submitForm in second button, but use data from state in other function (ie go to checkin)
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/PostClientByInfo?firstName=${data.firstName}&lastName=${data.lastName}&middleInitial=${data.middleInitial}&suffix=""&birthdate=${data.dateOfBirth}&gender=${data.gender}&race=${data.race}&zipcode=${data.postalCode}&numFamily=${data.familySize}`)
        // if successful
        if(response.ok && response.status===200){
            // display successful popup
            alert("Successfully Saved")

            if (goToCheckin) {
                // get json data from server
                let res = await response.json()
                if(res.length > 0){
                    // add clientID to data object
                    data.clientID = res[0].clientID
                    // temporary store client info to localstorage for checing-in (will be deleted in Checkin page)
                    localStorage.setItem("tmpCheckinClient", JSON.stringify(data))
                    // go to checkin page
                    router.push(`/checkin?id=${data.clientID}`)
                }
            }
            else{
                // go back to index page
                router.push(`/`)
            }
        }else{
            // display unsuccessful popup
            alert("Saving Failed")
        }            
    }

    let checkinNewClient = () => {
        setGoToCheckin(true)
    }

    return (
        <div className="flex flex-col min-w-full min-h-screen overflow-x-hidden">
            <form onSubmit={handleSubmit(submitForm)} className="card mt-28 mx-auto">
                <div className='card-body min-w-full'>
                    <h1 className='card-title my-0'>New Client Form</h1>
                    <div className='divider my-0'></div>
                    <div className="form-control flex-row grid grid-cols-4 gap-4">

                        {/* First Name */}
                        <div className='p-2 w-60 flex flex-col'>
                        <label className="label label-text text-xl">First Name <span className="text-orange-700">{errors.firstName?.message}</span></label>
                        <input id="firstName" type="text" name="firstName" {...register('firstName')} className="input input-bordered min-w-sm p-2 text-center bg-white" />
                        </div>

                        {/* Last Name */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text text-xl">Last Name <span className="text-orange-700">{errors.lastName?.message}</span></label>
                        <input id="lastName" type="text" name="lastName" {...register('lastName')} className="input input-bordered min-w-sm p-2 text-center bg-white" />
                        </div>

                        {/* Middle Initial */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text text-xl">Middle Initial</label>
                        <input id="middleInitial" type="text" name="middleInitial" {...register('middleInitial')} className="input input-bordered min-w-sm p-2 text-center bg-white" />
                        </div>

                        {/* Date of Birth */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Date of Birth  <span className="text-orange-700">{errors.dateOfBirth?.message}</span></label>
                            <input id="dateOfBirth" type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" className="input input-bordered min-w-sm p-2 text-center bg-white"></input>
                        </div>

                        {/* Gender */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Gender</label>
                            <select name="gender" {...register('gender')} className="select select-bordered min-w-sm p-2 text-center bg-white">
                                <option defaultValue value="">(Optional)</option>
                                <option>F</option>
                                <option>M</option>
                                <option>X</option>
                            </select>
                        </div>

                        {/* Race */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Race</label>
                            <select name="race" {...register('race')} className="select select-bordered min-w-sm p-2 text-center bg-white">
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
                            <label className="label label-text text-xl">Postal Code <span className="text-orange-700">{errors.postalCode?.message}</span></label>
                            <input type="text" name="postalCode" {...register('postalCode')} className="input input-bordered min-w-sm p-2 text-center bg-white" />
                        </div>

                        {/* Family */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Number of Kids</label>
                            <input type="text" name="familySize" {...register('familySize')} className="input input-bordered min-w-sm p-2 text-center bg-white" />
                        </div>

                    </div>
                    <div className='card-actions justify-center my-0 py-8'>
                        <button type="submit" className="btn btn-wide btn-secondary p-2 my-2 m-8">Save</button>
                        <button type="submit" onClick={()=> {checkinNewClient()}} className="btn btn-wide btn-secondary p-2 my-2 m-8">Save and Checkin</button>
                    </div>
                    <div className='divider my-0'></div>
                </div>
            </form>
        </div>
    )
}
