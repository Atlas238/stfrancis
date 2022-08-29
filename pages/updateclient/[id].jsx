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
    familySize: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    banned: Yup.bool()
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
    const [banned, setBanned] = useState(false)
    const [isCheckedIn, setIsCheckedIn] = useState(false)
    const [goToCheckin, setGoToCheckin] = useState(false)

    const submitForm = async (updateClient) => {
        setUpdateClient(updateClient) //save in submit function so we can CALL submitForm in second button, but use data from state in other function (ie go to checkin)

        // Update client request to DB
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/updateClientByID?clientID=${id}&firstName=${updateClient.firstName}&lastName=${updateClient.lastName}&middleInitial=${updateClient.middleInitial}&birthdate=${updateClient.dateOfBirth.toISOString().split('T')[0]}&gender=${updateClient.gender}&race=${updateClient.race}&zipcode=${updateClient.postalCode}&banned=${updateClient.banned}&numKids=${updateClient.familySize}`)
        // if successful
        if(response.ok && response.status===200){
            alert("Successfully Saved")
            if (goToCheckin) {
                // temporary store client info to localstorage for checing-in (will be deleted in Checkin page)
                localStorage.setItem("tmpCheckinClient", JSON.stringify(updateClient))
                // go to checkin page
                router.push(`/checkin?id=${id}`)
            }
            else{
                // go back to profile page
                router.push(`/profile/${id}`)
            }
        }else{
            // display unsuccessful popup
            alert("Saving Failed")
        }
    }

    const checkinClient = () => {
        setGoToCheckin(true)
    }
    

    const deleteClient = async () => {
        console.log(id)
        console.log(typeof(id))
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        let checkedInClientDict = JSON.parse(localStorage.getItem("checkedInClientDict"))
        console.log(checkedInClients)
        console.log(checkedInClientDict)
        // delete client by id (add route)
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/deleteClientByID?clientID=${id}`)
        // if successful
        if(response.ok && response.status===200){
            // if checked in, remove from checkedInClients list
            let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
            let updatedCheckedInClients = []
            checkedInClients?.forEach(c => {
                if (c.clientID !== Number(id)) updatedCheckedInClients.push(c)
            })
            localStorage.setItem("checkedInClients", JSON.stringify(updatedCheckedInClients))

            // if checked in, remove client from checkedInClientDict list
            let checkedInClientDict = JSON.parse(localStorage.getItem("checkedInClientDict"))
            if (Number(id) in checkedInClientDict){
                delete checkedInClientDict[Number(id)]
                localStorage.setItem("checkedInClientDict", JSON.stringify(checkedInClientDict))
            } 

            // display successful popup
            alert("Successfully Deleted")
            // go back to index page
            router.push(`/`)
        }else{
            // display unsuccessful alert
            alert("Deleting Failed")
        }
    }

    const back = ()  => {
        // go back to profile page 
        router.push(`/profile/${id}`)
    }

    const handleBanned = () => {
        let isChecked = document.getElementById('banned').checked
        setBanned(isChecked)
    }

    // fill fields with current profile
    const fillFieldswithProfile = (profile) => {
        document.getElementById('firstName').value = profile.firstName
        document.getElementById('lastName').value = profile.lastName
        document.getElementById('middleInitial').value = profile.middleInitial
        document.getElementById('dateOfBirth').valueAsDate = new Date(profile.birthday)
        document.getElementById('gender').value = profile.gender === 'N/A' ? '' : profile.gender
        document.getElementById('race').value = profile.race === 'N/A' ? '' : profile.race
        document.getElementById('postalCode').value = profile.zipCode === 0 ? '' : profile.zipCode
        document.getElementById('banned').checked = profile.banned
        document.getElementById('familySize').value = profile.numFamily
        profile.banned ? handleBanned() : null
    }

    useEffect(() => {
        // get checkedInClients from localstorage
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        // if client is checked in, set isCheckedIn to true
        if (checkedInClients?.some(c => c.clientID === Number(id))) {
            setIsCheckedIn(true)
        }
        
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
                    <div className="grid grid-flow-col">
                        <h1 className='card-title my-0'>Update Client Form</h1>
                        <div className="flex gap-2 justify-self-end place-items-center">
                            <p>{banned ? <span className="font-bold text-lg bg-red-900 text-primary rounded-md px-4">BANNED</span> : <></>} </p>
                            <div><label className="block label-text text-center">Ban</label><input id="banned" {...register('banned')} onChange={handleBanned} type="checkbox" className="toggle center"/></div>
                        </div>
                    </div>
                    <div className='divider my-0'></div>
                    <div className="form-control flex-row grid grid-cols-4 gap-4">

                        {/* First Name */}
                        <div className='p-2 w-60 flex flex-col'>
                        <label className="label label-text text-xl">First name <span className="text-orange-700">{errors.firstName?.message}</span></label>
                        <input id="firstName" type="text" name="firstName" {...register('firstName')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Last Name */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text text-xl">Last name <span className="text-orange-700">{errors.lastName?.message}</span></label>
                        <input id="lastName" type="text" name="lastName" {...register('lastName')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Middle Initial */}
                        <div className="p-2 w-60 flex flex-col">
                        <label className="label label-text text-xl">Middle Initial</label>
                        <input id="middleInitial" type="text" name="middleInitial" {...register('middleInitial')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Date of Birth */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Date of Birth  <span className="text-orange-700">{errors.dateOfBirth?.message}</span></label>
                            <input id="dateOfBirth" type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" className="input input-bordered min-w-sm p-2 text-center"></input>
                        </div>

                        {/* Gender */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Gender</label>
                            <select id="gender" name="gender" {...register('gender')} className="select select-bordered min-w-sm p-2 text-center">
                                <option defaultValue value="">(Optional)</option>
                                <option>F</option>
                                <option>M</option>
                                <option>X</option>
                            </select>
                        </div>

                        {/* Race */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl">Race</label>
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
                            <label className="label label-text text-xl">Postal code <span className="text-orange-700">{errors.postalCode?.message}</span></label>
                            <input id="postalCode" type="text" name="postalCode" {...register('postalCode')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                        {/* Family */}
                        <div className="p-2 w-60 flex flex-col">
                            <label className="label label-text text-xl"># People in Family</label>
                            <input id="familySize" type="text" name="familySize" {...register('familySize')} className="input input-bordered min-w-sm p-2 text-center" />
                        </div>

                    </div>
                    <div className='card-actions justify-center my-0 py-8'>
                        <button type="submit" className="btn btn-wide btn-secondary p-2 my-2 m-8">Update</button>
                        {isCheckedIn? <></> : <button type="submit" onClick={()=> {checkinClient()}} className="btn btn-wide btn-secondary p-2 my-2 m-8">Update and Checkin</button>}
                        <button onClick={()=> back()} className="btn btn-wide btn-secondary p-2 my-2 m-8">Back</button>
                    </div>
                    <div className='card-actions justify-end my-0 py-0'>
                        <label htmlFor="my-modal" className="btn modal-button btn-link text-warning-content">Delete Client</label>
                        <input type="checkbox" id="my-modal" className="modal-toggle" />
                        <label htmlFor="my-modal" className="modal cursor-pointer">                    
                        <label className="modal-box relative" htmlFor="my-modal">
                            <label htmlFor="my-modal" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 className="text-center text-lg font-bold">Delete this profile?</h3>
                            <div className="modal-action justify-center">
                                <label onClick={()=> {deleteClient()}} htmlFor="my-modal" className="btn btn-sm btn-warning">DELETE</label>
                            </div>
                        </label>
                        </label>
                    </div>
                    <div className='divider my-0'></div>
                </div>
            </form>
        </div>
    )
}
