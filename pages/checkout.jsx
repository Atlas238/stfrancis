import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form';
import { NavLink } from '../components/NavLink.jsx';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// form validation
const checkoutSchema = Yup.object().shape({
    menClothing: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    womenClothing: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    boyClothing: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    girlClothing: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    familySize: Yup.number().positive().integer().nullable(true).transform((_, val) => val ? Number(val) : null),
    // soap: Yup.boolean(),
    // shampCondit: Yup.boolean(),    
    // lotion: Yup.boolean(),    
    // razoe: Yup.boolean(),    
    // toothPaste: Yup.boolean(),    
    // toothBrush: Yup.boolean(),
    backpack: Yup.boolean(),
    sleeingbag: Yup.boolean(),
},[]);

// Main Checkout Page
export default function checkout() {
    const router = useRouter()
    const [client, setClient] = useState(null)

    // Client ID from query parameters
    const { id } = router.query

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(checkoutSchema)
    });
    const {errors} = formState;

    // Submits form data to DB, updates VISIT record
    const submitForm = (data) => {
        let updateVisitRoute = ""
        console.log(data)

        // Send data to DB!
        // fetch(updateVisitRoute, { method: 'POST', body: data })
        
        // Remove client from checkedin list
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        let updatedCheckedInClients = []
        checkedInClients?.forEach(c => {
            if (c.clientID !== client.clientID) updatedCheckedInClients.push(c)
        })
        localStorage.setItem("checkedInClients", JSON.stringify(updatedCheckedInClients))
        //Move them back to the checkedin page

        router.push('/checkedin');
    }

    useEffect(() => {
        // Check for clients on page load
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        checkedInClients?.forEach(client => {
            console.log(typeof(client.clientID))
            if (client.clientID === Number(id)) setClient(client)
        })
    }, [localStorage.getItem('checkedInClients')])

    return (
       <div className="mt-20">
            <div className="card mx-auto w-10/12">
            <form className="card-body" onSubmit={handleSubmit(submitForm)}>
                <h1 className="card-title">Saint Francis Intake Form</h1>
                <div className="flex grid grid-cols-2">
                    <h1 className="card-title text-3xl">{client?.firstName} {client?.middleInitial === ""? "" : client?.middleInitial + '.'} {client?.lastName}</h1>
                    <label htmlFor="familySize" className="justify-self-end text-xl cursor-pointer">Family Size:  <input type="text" name="familySize" placeholder="" {...register('familySize')} className="input input-sm w-16 input-bordered text-lg text-center" /></label>
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
                {/* <div tabIndex="1" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title flex-auto text-xl font-body bg-base-200">Household</div>
                    <div className="collapse-content flex-auto grid grid-cols-6 gap-8 bg-white"> 
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Bed Sets</span> 
                            <input type="checkbox" name="Bed Sets" {...register('Bed Sets')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Cleaning Supplies</span> 
                            <input type="checkbox" name="Cleaning Supplies" {...register('Cleaning Supplies')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Diapers</span> 
                            <input type="checkbox" name="Diapers" {...register('Diapers')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Hygiene Kit</span> 
                            <input type="checkbox" name="Hygiene Kit" {...register('Hygiene Kit')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kitchenware</span> 
                            <input type="checkbox" name="Kitchenware" {...register('Kitchenware')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Umbrella</span> 
                            <input type="checkbox" name="Umbrella" {...register('Umbrella')} className="checkbox checkbox-lg" />
                        </label>
                    </div>
                </div> */}
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
                    <textarea placeholder= "Additional requests/needs.." className ="textarea bg-white text-lg"></textarea> 
                </div>
                <p>{errors.menClothing?.message}</p>
                <p>{errors.womenClothing?.message}</p>
                <div className='divider my-0'></div>
                <div className="flex p-4">
                    <button type="submit" className="btn btn-accent btn-sm w-1/2">Checkout</button>
                    <NavLink href= "/checkedin" className="btn btn-primary btn-sm w-1/2">Back</NavLink>  
                </div>
            </form>
            </div>
        </div>
    )
}