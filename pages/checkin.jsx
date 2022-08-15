import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'

import { NavLink } from '../components/NavLink.jsx'
import Printout from "components/Printout.jsx"

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';

// form validation
const checkoutSchema = Yup.object().shape({
    menClothing: Yup.boolean(),
    womenClothing: Yup.boolean(),
    boyClothing: Yup.boolean(),
    girlClothing: Yup.boolean(),
    familySize: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    busTicket: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    giftCard: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    diaper: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    financialAssistance: Yup.number().min(0).nullable(true).transform((_, val) => val ? Number(val) : null),
    backpack: Yup.boolean(),
    sleeingbag: Yup.boolean(),
    notes: Yup.string(),
},[]);

// Main Checkout Page
export default function checkout() {
    const router = useRouter()
    const [client, setClient] = useState(null)
    const [formData, setFormData] = useState(null)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(checkoutSchema)
    });
    const {errors} = formState;

    const printForm = async () => {
        window.print()
    }

    const submitForm = async (data) => {
        setFormData(data)
        // Convert client to checkin model ->
        let checkinModel = {
            clientID: client.clientID,
            checkinDate: new window.Date()
        }
        
        // Create a visit with client ID // response has visitID ?
        let response = await fetch(`https://stfrancisone.herokuapp.com/home/createClientVisitByID?clientID=${client.clientID}`, { method: 'POST', body: JSON.stringify(checkinModel) })
        // if successful
        if(response.ok && response.status===200){

            // store client to chckedInClients localstorage
            let checkedInClients = JSON.parse(localStorage.getItem("checkedInClients"))
            if (checkedInClients === undefined || checkedInClients === null) {
                checkedInClients = []
                checkedInClients.push(client)
            } else {
                checkedInClients.push(client)
            }
            localStorage.setItem("checkedInClients", JSON.stringify(checkedInClients))

            // store form data to checkedInClientDict localstorage (key:clientID, value:json object)
            let checkedInClientDict = JSON.parse(localStorage.getItem("checkedInClientDict"))
            if (checkedInClientDict === undefined || checkedInClientDict === null) {
                checkedInClientDict = {}
                checkedInClientDict[client.clientID] = data
            } else {
                checkedInClientDict[client.clientID] = data
            }
            localStorage.setItem("checkedInClientDict", JSON.stringify(checkedInClientDict))

            // redirect to home

            printForm() // Print!

            router.push(`/`)

        }else{
            // failed to check in
        }           
    }

    useEffect(() => {
        // Check for clients on page load
        async function getClientData(id) {
            let res = await fetch(`https://stfrancisfront.herokuapp.com/home/getClientByID?clientID=${id}`)
            let data = await res.json()
            return data
        }
        let checkinClient = JSON.parse(localStorage.getItem('tmpCheckinClient'))
        
        if (checkinClient != null | checkinClient != undefined){
            setClient(checkinClient)
            localStorage.removeItem('tmpCheckinClient');
        } else {
            if (router.isReady) {
                const { id } = router.query
                setClient(getClientData(id))
            }
        }

    }, [localStorage.getItem('tmpCheckinClient')])

    return (
       <div className="mt-20">
            <div className="card mx-auto w-10/12 hide">
            <form className="card-body" onSubmit={handleSubmit(submitForm)}>
                <h1 className="card-title">Saint Francis Check-In Form</h1>
                <div className="grid grid-cols-2">
                    <h1 className="card-title text-3xl">{client?.firstName != undefined ? client?.firstName : "Who"} {client?.middleInitial === undefined ? "" : client?.middleInitial === "" ? "" : client?.middleInitial + '.'} {client?.lastName != undefined ? client?.lastName : "are you?"}</h1>
                    {/* Think we only want this on newClient form? */}
                    {/* <label htmlFor="familySize" className="justify-self-end text-xl cursor-pointer">Family Size:  <input type="text" name="familySize" placeholder="" {...register('familySize')} className="input input-sm w-16 input-bordered text-lg text-center" /></label> */}
                </div>
                <div className='divider my-0'></div>
                {/* Clothing */}
                <div tabIndex="0" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-body bg-base-200 ">Clothing</div>
                    <div className="collapse-content grid grid-cols-4 gap-8 bg-white"> 
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Men</span> 
                            <input type="checkbox" name="menClothing" {...register('menClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Women</span> 
                            <input type="checkbox" name="womenClothing" {...register('womenClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Boy)</span> 
                            <input type="checkbox" name="boyClothing" {...register('boyClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Girl)</span> 
                            <input type="checkbox" name="girlClothing" {...register('girlClothing')} className="checkbox checkbox-lg" />
                        </label>

                    </div>
                </div>

                {/* Special Items */}
                <div tabIndex="2" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title flex-auto text-xl font-body bg-base-200">Special Requests</div>
                    <div className="collapse-content grid grid-cols-4 gap-8 bg-white"> 
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Backpack</span> 
                        {/* {client?.eligibleItems.includes('Backpack') ? ( */}
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg" />
                        {/* ) : (
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg btn-disabled" disabled />
                        )} */}
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Sleeping Bag</span> 
                        {/* {client?.eligibleItems.includes('sleepingbag') ? ( */}
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" />
                        {/* ) : (
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" disabled />
                        )} */}
                        </label>
                        <label></label>
                        <label></label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Bus Ticket</span> 
                            <input type="text" name="busTicket" {...register('busTicket')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Gift Card</span> 
                            <input type="text" name="giftCard" {...register('giftCard')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Diaper</span> 
                            <input type="text" name="diaper" {...register('diaper')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Financial Assistance</span> 
                            <input type="text" name="financialAssistance" {...register('financialAssistance')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                    </div>
                </div>
                {/* Notes Section */}
                <div tabIndex="3" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-body bg-base-200">Notes</div>
                    <textarea name="notes" {...register('notes')} placeholder="Additional requests/needs.." className ="textarea bg-white text-lg"></textarea> 
                </div>
                <p>{errors.menClothing?.message}</p>
                <p>{errors.womenClothing?.message}</p>
                <div className='divider my-0'></div>
                <div className="flex p-4 gap-8">
                    <button type="submit" className="btn btn-accent btn-sm w-1/3">Check In</button>
                    <NavLink href= "/" className="btn btn-primary btn-sm w-1/3">Back</NavLink>  
                </div>
            </form>
            </div>
            <div>
                <Printout formData={formData} client={client}/>
            </div>
        </div>
    )
}