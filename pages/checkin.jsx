import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useForm } from 'react-hook-form'

import { NavLink } from '../components/NavLink.jsx'
import CheckinError from "components/CheckinError.jsx"
import Printout from "components/Printout.jsx"

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup';
import Loading from "components/Loading.jsx"

// form validation
const checkoutSchema = Yup.object().shape({
    menClothing: Yup.boolean(),
    womenClothing: Yup.boolean(),
    boyClothing: Yup.boolean(),
    girlClothing: Yup.boolean(),
    busTicket: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null).typeError('A number is required.'),
    giftCard: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null).typeError('A number is required.'),
    diaper: Yup.number().min(0).integer().nullable(true).transform((_, val) => val ? Number(val) : null).typeError('A number is required.'),
    financialAssistance: Yup.number().min(0).nullable(true).transform((_, val) => val ? Number(val) : null).typeError('A number is required.'),
    backpack: Yup.boolean(),
    sleeingbag: Yup.boolean(),
    household: Yup.string(),
    notes: Yup.string(),
},[]);

// Main Checkin Page
export default function checkin() {
    const router = useRouter()

    const [client, setClient] = useState(null)
    const [loading, setLoading] = useState(false)
    const [abort, setAbort] = useState(false)
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

        // store client to chckedInClients localstorage
        let checkedInClients = JSON.parse(localStorage.getItem("checkedInClients"))
        if (checkedInClients === undefined || checkedInClients === null) {
            checkedInClients = []
            checkedInClients.push({ client: client, form: data })
        } else {
            checkedInClients.forEach((client) => {
                if (client.clientID === data.clientID) {
                    return 
                }
            })
            checkedInClients.push({ client: client, form: data })
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
        localStorage.removeItem('tmpCheckinClient');

        setTimeout(function () {
            printForm() // Print!
            // redirect to home
            router.push(`/`)
          }, 0);
    }

    useEffect(() => {
        setLoading(true)
        // Check for clients on page load
        async function getClientData(id) {
            let res = await fetch(`https://stfrancisone.herokuapp.com/home/getClientByID?clientID=${id}`)
            let data = await res.json()
            setClient(data[0])
        }

        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        if (checkedInClients != null || checkedInClients != undefined) {
            if (router.isReady) {
                const { id } = router.query
                checkedInClients.forEach((c) => {
                    if (c.clientID == id) {
                        setAbort(true)
                    }
                })
                if (!abort) getClientData(id)
                setLoading(false)
            }
        } else {
            if (router.isReady) {
                const { id } = router.query
                getClientData(id)
                setLoading(false)
            }
        }

    }, [localStorage])

    return (
       <div className="mt-20">
        {loading 
        ? <Loading loading={loading} /> :
            abort ? <CheckinError /> : 
            <div className="card mx-auto w-10/12 hide">
            <form className="card-body" onSubmit={handleSubmit(submitForm)}>
                <h1 className="card-title">Saint Francis Check-In Form</h1>
                <div className="grid grid-flow-col">
                    <div>
                        <h1 className="card-title text-3xl">{client?.firstName != undefined ? client?.firstName : "Who"} {client?.middleInitial === undefined ? "" : client?.middleInitial === "" ? "" : client?.middleInitial + '.'} {client?.lastName != undefined ? client?.lastName : "are you?"}</h1>
                        <p className="text-base">Number of Kids: {(client?.numFamily===undefined || client?.numFamily===null) ? '' : client?.numFamily}</p>
                    </div>
                </div>
                <div className='divider my-0'></div>
                {/* Clothing */}
                <div tabIndex="0" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-body bg-base-200 ">Clothing</div>
                    <div className="collapse-content grid grid-cols-4 p-4 gap-x-16 bg-white"> 
                        <label className="label cursor-pointer gap-x-8 justify-center">
                            <span className="label-text text-lg">Men</span> 
                            <input type="checkbox" name="menClothing" {...register('menClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                            <span className="label-text text-lg">Women</span> 
                            <input type="checkbox" name="womenClothing" {...register('womenClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                            <span className="label-text text-lg">Kids (Boy)</span> 
                            <input type="checkbox" name="boyClothing" {...register('boyClothing')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                            <span className="label-text text-lg">Kids (Girl)</span> 
                            <input type="checkbox" name="girlClothing" {...register('girlClothing')} className="checkbox checkbox-lg" />
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
                    <div className="collapse-content grid grid-cols-4 p-4 gap-y-8 gap-x-16 bg-white"> 
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Bus Ticket <p className="text-sm text-orange-700">{errors.busTicket?.message}</p></span> 
                            <input type="text" name="busTicket" {...register('busTicket')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Gift Card <p className="text-sm text-orange-700">{errors.giftCard?.message}</p></span> 
                            <input type="text" name="giftCard" {...register('giftCard')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Diaper <p className="text-sm text-orange-700">{errors.diaper?.message}</p></span> 
                            <input type="text" name="diaper" {...register('diaper')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Financial Assistance <p className="text-sm text-orange-700">{errors.financialAssistance?.message}</p></span> 
                            <input type="text" name="financialAssistance" {...register('financialAssistance')} className="input input-bordered w-1/3 text-lg text-center" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Backpack</span> 
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer gap-x-8 justify-center">
                        <span className="label-text text-lg">Sleeping Bag</span> 
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" />
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
                    <button type="submit" className="btn btn-accent btn-sm w-1/2">Check In</button>
                    <NavLink href= "/" className="btn btn-primary btn-sm w-1/2">Back</NavLink>  
                </div>
            </form>
            </div>
            }
            <Printout formData={formData} client={client}/>
        </div>
    )
}