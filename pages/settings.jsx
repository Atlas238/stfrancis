import SettingForm from "components/SettingForm";

export default function settings() {
    return (
        <div>
            <h1 className="pt-40 text-4xl text-primary-content ml-10 select-none">Settings</h1>
            <div className="divider"></div>
            <SettingForm />
        </div>
    )
}