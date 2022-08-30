import SettingForm from "components/SettingForm";
import { useEffect } from "react";

export default function settings() {
    useEffect(()=> {
        localStorage.removeItem('lastClients')
    }, [localStorage]) 
    return (
        <div>
            <h1 className="pt-40 text-4xl text-primary-content ml-10 select-none">Settings</h1>
            <div className="divider"></div>
            <SettingForm />
        </div>
    )
}