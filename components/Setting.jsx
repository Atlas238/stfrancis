import { RiArrowDropDownFill, RiArrowDropUpFill } from "react-icons/ri";

export default function Setting({ name, description, incrementor, decrementor, value, valueTitle }) {
    return (
        <>
        <label className="label text-4xl">{name}</label>
        <p className="text-lg m-2">{description}</p>
        <div className="flex">
            <p className="m-5 text-3xl text-right w-32"><span className="text-3xl transition-all">{value}</span> {valueTitle}</p>
            <div className="flex flex-col justify-center">
            <button onClick={incrementor} type="button" className="text-3xl hover:scale-110 active:scale-75 transition-all"><RiArrowDropUpFill /></button>
            <button onClick={decrementor} type="button" className="text-3xl hover:scale-110 active:scale-75 transition-all"><RiArrowDropDownFill /></button>
            </div>
        </div>
        </>
    )
}