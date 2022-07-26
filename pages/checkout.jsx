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
    soap: Yup.boolean(),
    shampCondit: Yup.boolean(),    
    lotion: Yup.boolean(),    
    razoe: Yup.boolean(),    
    toothPaste: Yup.boolean(),    
    toothBrush: Yup.boolean(),
    backpack: Yup.boolean(),
    sleeingbag: Yup.boolean(),
},[]);

export default function checkout() {
    const [client, setClient] = useState(null)
    const router = useRouter()

    const { id } = router.query

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(checkoutSchema)
    });
    const {errors} = formState;

    const submitForm = (data) => {
        let createAssistanceString = "https://stfrancisone.herokuapp.com/home/"
        console.log(data)

        // Send data to DB!
        // fetch(createAssistanceString, { method: 'POST', body: data })
        
        // Remove client from checkedin list
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))
        let updatedCheckedInClients = []
        checkedInClients?.forEach(c => {
            if (c.id !== client.id) updatedCheckedInClients.push(c)
        })
        localStorage.setItem("checkedInClients", JSON.stringify(updatedCheckedInClients))
        router.push('/checkedin');
    }

    useEffect(() => {
        let checkedInClients = JSON.parse(localStorage.getItem('checkedInClients'))

        checkedInClients?.forEach(client => {
            if (client.id.toString() === id) setClient(client)
        })
    }, [localStorage.getItem('checkedInClients')])

    return (
       <div className="mt-20">
            <div className="card mx-auto w-8/12">
            <p className="card-title">Fill out what {client?.firstName} recieved today!</p>
            <p>client ID: {id}</p>

            <form className="card-body" onSubmit={handleSubmit(submitForm)}>

                {/* Clothing */}
                <div tabIndex="0" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-medium bg-base-200">Clothing</div>
                    <div className="collapse-content grid grid-cols-4 gap-8"> 
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Men</span> 
                            <input type="text" name="menClothing" placeholder="Qty" {...register('menClothing')} className="input input-bordered w-1/4 text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Women</span> 
                            <input type="text" name="womenClothing" placeholder="Qty" {...register('womenClothing')} className="input input-bordered w-1/4 text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Boy)</span> 
                            <input type="text" name="boyClothing" placeholder="Qty" {...register('boyClothing')} className="input input-bordered w-1/4 text-center" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Kids (Girl)</span> 
                            <input type="text" name="girlClothing" placeholder="Qty" {...register('girlClothing')} className="input input-bordered w-1/4 text-center" />
                        </label>

                    </div>
                </div>

                {/* Household */}
                <div tabIndex="1" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-medium bg-base-200">Household</div>
                    <div className="collapse-content grid grid-cols-6 gap-8"> 
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Soap</span> 
                            <input type="checkbox" name="soap" {...register('soap')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Shamp/Condit</span> 
                            <input type="checkbox" name="shampCondit" {...register('shampCondit')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Lotion</span> 
                            <input type="checkbox" name="lotion" {...register('lotion')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Razor</span> 
                            <input type="checkbox" name="razor" {...register('razoe')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Tooth Paste</span> 
                            <input type="checkbox" name="toothPaste" {...register('toothPaste')} className="checkbox checkbox-lg" />
                        </label>
                        <label className="label cursor-pointer py-4">
                            <span className="label-text text-lg">Tooth Brush</span> 
                            <input type="checkbox" name="toothBrush" {...register('toothBrush')} className="checkbox checkbox-lg" />
                        </label>
                    </div>
                </div>
                {/* Special Items */}
                <div tabIndex="2" className="collapse collapse-open border border-gray-200 dark:border-gray-700 rounded-box"> 
                    <div className="collapse-title text-xl font-medium bg-base-200">Special Items</div>
                    <div className="collapse-content grid grid-cols-6 gap-8"> 
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Backpack</span> 
                        {client?.eligibleItems.includes('Backpack') ? (
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg" />
                        ) : (
                            <input type="checkbox" name="backpack" {...register('backpack')} className="checkbox checkbox-lg btn-disabled" disabled />
                        )}
                        </label>
                        <label className="label cursor-pointer py-4">
                        <span className="label-text text-lg">Sleeping Bag</span> 
                        {client?.eligibleItems.includes('sleepingbag') ? (
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" />
                        ) : (
                            <input type="checkbox" name="sleepingbag" {...register('sleepingbag')} className="checkbox checkbox-lg" disabled />
                        )}
                        </label>
                    </div>
                </div>
                <p>{errors.menClothing?.message}</p>
                <p>{errors.womenClothing?.message}</p>
                <div className="flex p-4">
                    <button type="submit" className="btn btn-accent btn-sm w-1/2">Checkout</button>
                    <NavLink href= "/checkedin" className="btn btn-primary btn-sm w-1/2">Back</NavLink>  
                </div>
            </form>
            </div>
        </div>
    )
}