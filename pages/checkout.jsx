import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { NavLink } from '../components/NavLink.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// form validation
const checkoutSchema = Yup.object().shape({
    menClothing: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    womenClothing: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    boyClothing: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    girlClothing: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    familySize: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    busTicket: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    giftCard: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    diaper: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    financialAssistance: Yup.number().min(0).nullable(true).transform((_, val) => val ? Number(val) : null),
    backpack: Yup.boolean(),
    sleeingbag: Yup.boolean(),
    household: Yup.string(),
    notes: Yup.string(),
},[]);

// Main Checkout Page
export default function checkout() {
    const router = useRouter()
    const [client, setClient] = useState(null)
    const [banned, setBanned] = useState(false)

    // Client ID from query parameters
    const { id } = router.query
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(checkoutSchema)
    });
    const {errors} = formState;

    // Submits form data to DB, updates VISIT record
    const submitForm = async (data) => {
        console.log(data)

        // Create visit record and check out record when client received items, if not, visit will not be created
        if (data.menClothing || data.womenClothing || data.boyClothing || data.girlClothing || data.busTicket || data.giftCard || data.diaper || data.financialAssistance || data.backpack || data.sleeingbag || data.notes!=="") {
            // Create a visit record with client ID
            let visitID = null
            let response = await fetch(`https://stfrancisone.herokuapp.com/home/createClientVisitByID?clientID=${client.clientID}`)
            if(response.ok && response.status===200){
                console.log("Visit created")
                let data = await response.json()
                visitID = data
            }
            // Create a check out record with visit ID and form data
            response = await fetch(`https://stfrancisone.herokuapp.com/home/checkout?visitID=${visitID}&mens=${data.menClothing}&womens=${data.womenClothing}&kids=${data.girlClothing+data.boyClothing}&backpack=${data.backpack}&sleepingbag=${data.sleepingbag}&request=${data.notes}&houseHoldItems=${data.household}`)
            if(response.ok && response.status===200){
                console.log("Checkout record created")
            }
            // Update banned status if client is banned
            if(banned){
                response = await fetch(`https://stfrancisone.herokuapp.com/home/updateClientByID?clientID=${client.clientID}&banned=${banned}`)
                if(response.ok && response.status===200){
                    console.log("Banned status updated")
                }
            }
        }

        // Remove client from checkedin list
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        let updatedCheckedInClients = []
        checkedInClients?.forEach(c => {
            if (c.clientID !== client.clientID) updatedCheckedInClients.push(c)
        })
        localStorage.setItem("checkedInClients", JSON.stringify(updatedCheckedInClients))

        // Remove client from checkedInClientDict list
        let checkedInClientDict = JSON.parse(localStorage.getItem("checkedInClientDict"))
        if (client.clientID in checkedInClientDict){
            delete checkedInClientDict[client.clientID]
        }
        localStorage.setItem("checkedInClientDict", JSON.stringify(checkedInClientDict))

        //Move them back to the checkedin page
        router.push('/checkedin');

    }

    // fill fields with checkin info
    const fillFieldswithCheckinInfo = (checkinData) => {
        document.getElementById('backpack').checked = checkinData.backpack
        document.getElementById('sleepingbag').checked = checkinData.sleepingbag
        document.getElementById('busTicket').value = checkinData.busTicket
        document.getElementById('giftCard').value = checkinData.giftCard
        document.getElementById('diaper').value = checkinData.diaper
        document.getElementById('financialAssistance').value = checkinData.financialAssistance
        document.getElementById('household').value = checkinData.household
        document.getElementById('notes').value = checkinData.notes
        document.getElementById('backpack').focus()
        document.getElementById('sleepingbag').focus()
        document.getElementById('busTicket').focus()
        document.getElementById('giftCard').focus()
        document.getElementById('diaper').focus()
        document.getElementById('financialAssistance').focus()
        document.getElementById('household').focus()
        document.getElementById('notes').focus()
    }
    
    const handleBanned = () => {
        let isChecked = document.getElementById('banned').checked
        setBanned(isChecked)
    }

    useEffect(() => {
        // Check for clients on page load
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        checkedInClients?.forEach(client => {
            console.log(typeof(client.clientID))
            if (client.clientID === Number(id)) setClient(client)
        })

        let checkedInClientDict = JSON.parse(localStorage.getItem('checkedInClientDict'))
        if (checkedInClientDict && Number(id) in checkedInClientDict){
            fillFieldswithCheckinInfo(checkedInClientDict[Number(id)])
        }
    }, [localStorage.getItem('checkedInClients'), localStorage.getItem('checkedInClientDict')])

    return (
       <div className="mt-20">
            <div className="card mx-auto w-10/12">
            <form className="card-body" onSubmit={handleSubmit(submitForm)}>
                <h1 className="card-title">Saint Francis Intake Form</h1>
                <div className="grid grid-flow-col">
                    <div>
                        <h1 className="card-title text-3xl">{client?.firstName} {client?.middleInitial === ""? "" : client?.middleInitial + '.'} {client?.lastName}</h1>
                        <p className="text-base">Family Size: {(client?.numFamily===undefined || client?.numFamily===null) ? '' : client?.numFamily}</p>
                    </div>
                    <div className="flex gap-2 justify-self-end place-items-center">
                        <p>{banned ? <span className="font-bold text-lg bg-red-900 text-primary rounded-md px-4">BANNED</span> : <></>} </p>
                        <div><label className="block label-text text-center">Ban</label><input id="banned" {...register('banned')} onChange={handleBanned} type="checkbox" className="toggle center"/></div>
                    </div>
                </div>
                <div className='divider my-0'></div>
                {/* Clothing */}
                <div tabIndex="0" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-body bg-base-200 ">Clothing</div>
                    <div className="collapse-content grid grid-cols-4 gap-8 bg-white"> 
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Men</span> 
                            <input type="text" name="menClothing" placeholder="Qty" {...register('menClothing')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Women</span> 
                            <input type="text" name="womenClothing" placeholder="Qty" {...register('womenClothing')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Boy)</span> 
                            <input type="text" name="boyClothing" placeholder="Qty" {...register('boyClothing')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Girl)</span> 
                            <input type="text" name="girlClothing" placeholder="Qty" {...register('girlClothing')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>

                    </div>
                </div>

                {/* Household */}
                <div tabIndex="1" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title flex-auto text-xl font-body bg-base-200">Household</div>
                    <textarea id="household" name="household" {...register('household')} placeholder="Notes.." className ="textarea bg-white text-lg"></textarea> 
                </div>
                {/* Special Items */}
                <div tabIndex="2" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title flex-auto text-xl font-body bg-base-200">Special Requests</div>
                    <div className="collapse-content grid grid-cols-4 gap-8 bg-white"> 
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Backpack</span> 
                        {/* {client?.eligibleItems.includes('Backpack') ? ( */}
                            <input type="checkbox" id="backpack" name="backpack" {...register('backpack')} className="checkbox checkbox-lg" />
                        {/* ) : (
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg btn-disabled" disabled />
                        )} */}
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Sleeping Bag</span> 
                        {/* {client?.eligibleItems.includes('sleepingbag') ? ( */}
                            <input type="checkbox" id="sleepingbag" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" />
                        {/* ) : (
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" disabled />
                        )} */}
                        </label>
                        <label></label>
                        <label></label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Bus Ticket</span> 
                            <input type="text" id="busTicket" name="busTicket" {...register('busTicket')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Gift Card</span> 
                            <input type="text" id="giftCard" name="giftCard" {...register('giftCard')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Diaper</span> 
                            <input type="text" id="diaper" name="diaper" {...register('diaper')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Financial Assistance</span> 
                            <input type="text" id="financialAssistance" name="financialAssistance" {...register('financialAssistance')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                    </div>
                </div>
                {/* Notes Section */}
                <div tabIndex="3" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-body bg-base-200">Notes</div>
                    <textarea id="notes" name="notes" {...register('notes')} placeholder="Additional requests/needs.." className ="textarea bg-white text-lg"></textarea> 
                </div>
                <p>{errors.menClothing?.message}</p>
                <p>{errors.womenClothing?.message}</p>
                <div className='divider my-0'></div>
                <div className="flex p-4 gap-8">
                    <button type="submit" className="btn btn-accent btn-sm w-1/2">Checkout</button>
                    <NavLink href= "/checkedin" className="btn btn-primary btn-sm w-1/2">Back</NavLink>  
                </div>
            </form>
            </div>
        </div>
    )
}