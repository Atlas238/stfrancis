import { useEffect, useState } from "react"

import Loading from "./Loading"
import Setting from "./Setting"

export default function SettingForm() {
    const [loading, setLoading] = useState(null)
    const [settings, setSettings] = useState({
        daysEarlyThreshold: 25,
        backpackThreshold: 91,
        sleepingbagThreshold: 181,
        override: false
    })


    const incrementDaysEarly = () => {
        let curr = settings.daysEarlyThreshold
        if (curr === 31) return
        setSettings({
            ...settings,
            daysEarlyThreshold: curr + 1
        })
    }
    const decrementDaysEarly = () => {
        let curr = settings.daysEarlyThreshold
        if (settings.daysEarlyThreshold === 0) return 
        setSettings({
            ...settings,
            daysEarlyThreshold: curr - 1
        })
    }
    const incrementDaysBackpack = () => {
        let curr = settings.backpackThreshold
        if (settings.backpackThreshold === 365) return
        setSettings({
            ...settings,
            backpackThreshold: curr + 1
        })
    }
    const decrementDaysBackpack = () => {
        let curr = settings.backpackThreshold
        if (settings.backpackThreshold === 0) return
        setSettings({
            ...settings,
            backpackThreshold: curr - 1
        })
    }
    const incrementDaysSleepingbag = () => {
        let curr = settings.sleepingbagThreshold
        if (settings.sleepingbagThreshold === 365) return
        setSettings({
            ...settings,
            sleepingbagThreshold: curr + 1
        })
    }
    const decrementDaysSleepingbag = () => {
        let curr = settings.sleepingbagThreshold
        if (settings.sleepingbagThreshold === 0) return
        setSettings({
            ...settings,
            sleepingbagThreshold: curr - 1
        })
    }

    const invertOverride = () => {
        let curr = settings.override
        setSettings({
            ...settings,
            override: !curr
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
            <Setting 
                name={"Days Early Threshold"}
                description={`The number of days a client must wait before being eligible to shop`}
                incrementor={incrementDaysEarly}
                decrementor={decrementDaysEarly}
                value={settings.daysEarlyThreshold}
                valueTitle={"Days"}
            />
            <div className="divider w-4/12"></div>
            <Setting
                name={"Backpack Threshold"}
                description={"The number of days a client must wait before being eligible to get another backpack"}
                incrementor={incrementDaysBackpack}
                decrementor={decrementDaysBackpack}
                value={settings.backpackThreshold}
                valueTitle={"Days"}
            />
            <div className="divider w-4/12"></div>
            <Setting  
                name={"Sleeping Bag Threshold"}
                description={"The number of days a client must wait before being eligible to get another Sleeping Bag"}
                incrementor={incrementDaysSleepingbag}
                decrementor={decrementDaysSleepingbag}
                value={settings.sleepingbagThreshold}
                valueTitle={"Days"}
            />
            <div className="divider w-4/12"></div>
            <Setting
                name={"Early Override"}
                description={"Allows a user to get rid of an early warning and check in an early client"}
                value={settings.override}
                inverter={invertOverride}
            />
            <button onClick={saveSettings} type="button" className="text-3xl p-8 w-fit self-end hover:scale-110 hover:underline active:scale-75 transition-all">Save</button>
        </form>
        }
        </>
    )
}