import { useEffect, useState } from "react"
import { RiArrowDropDownFill } from 'react-icons/ri'
import { RiArrowDropUpFill } from 'react-icons/ri'

import Loading from "./Loading"

export default function SettingForm() {
    const [loading, setLoading] = useState(null)
    const [settings, setSettings] = useState({
        daysEarlyThreshold: 25
    })


    const incrementDays = () => {
        let curr = settings.daysEarlyThreshold
        if (curr === 31) return
        setSettings({
            ...settings,
            daysEarlyThreshold: curr + 1
        })
    }

    const decrementDays = () => {
        let curr = settings.daysEarlyThreshold
        if (settings.daysEarlyThreshold === 0) return 
        setSettings({
            ...settings,
            daysEarlyThreshold: curr - 1
        })
    }

    const saveSettings = async () => {
        let res = await fetch('/api/settings', { method: 'POST', body: JSON.stringify(settings) })
        let data = await res.json()
        setSettings(data)
    }

    useEffect(() => {
        async function getSettings() {
            setLoading(true)
            let res = await fetch('/api/settings', { method: 'GET'})
            let data = await res.json()
            setSettings(data)
            setLoading(false)
        }

        getSettings()
    }, [])

    return (
        <>
        {
        loading ?
        <Loading loading={loading} options={'py-10 mx-auto w-3/12'}/>
        :
        <form className="form-control card pl-10 w-screen">
            <label className="label text-4xl">Days Early Threshold</label>
            <p className="text-lg m-2">If a client returns to shop in fewer days than this number, they will be labeled "Early"</p>
            <div className="flex">
            <p className="m-5 text-3xl text-right w-32"><span className={`text-3xl transition-all`}>{settings.daysEarlyThreshold}</span> Days</p>
            <div className="flex flex-col justify-center">
                <button onClick={incrementDays} type="button" className="text-3xl hover:scale-110 active:scale-75 transition-all"><RiArrowDropUpFill /></button>
                <button onClick={decrementDays} type="button" className="text-3xl hover:scale-110 active:scale-75 transition-all"><RiArrowDropDownFill /></button>
            </div>
            </div>
            <button onClick={saveSettings} type="button" className="text-3xl p-8 w-fit self-end hover:scale-110 hover:underline active:scale-75 transition-all">Save</button>
        </form>
        }
        </>
    )
}