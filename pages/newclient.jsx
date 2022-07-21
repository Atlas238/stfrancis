import { NavLink } from '../components/NavLink.jsx';

export default function newclient() {

    return (
        <div>
            <h1 className="py-8 font-bold text-white-700 text-center text-2xl">New Client Form</h1>
            <form className="px-40 py-4">
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-9 py-5 bg-white sm:p-6">
                        <div className="p-12 grid grid-cols-9 gap-12">
                        {/* First Name */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">First name</label>
                            <input type="text" name="firstName" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Last Name */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Last name</label>
                            <input type="text" name="lastName" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Middle Initial */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Middle Initial</label>
                            <input type="text" name="middleInitial" className="flex-1 w-1/3 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Date of Birth */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Date of Birth</label>
                            <input type="date" name="dateOfBirth" placeholder="date" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"></input>
                        </div>
                        {/* Gender */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Gender</label>
                            <select name="gender" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                                <option defaultValue>(Optional)</option>
                                <option>F</option>
                                <option>M</option>
                                <option>X</option>
                            </select>
                        </div>
                        {/* Race */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Race</label>
                            <select name="race" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                                <option defaultValue>(Optional)</option>
                                <option>American Indian or Alaska Native</option>
                                <option>Asian</option>
                                <option>Black or African American</option>
                                <option>Native Hawaiian or Other Pacific Islander</option>
                                <option>Hispanic or Latino</option>
                                <option>White</option>
                                <option>Other</option>
                            </select>
                        </div>
                        {/* Zip Code */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Postal code</label>
                            <input type="text" name="postalCode" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Family */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Family Id</label>
                            <input type="text" name="familyId" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-gray-50 text-center space-x-8">
                        <button type="submit" className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm font-bold rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        <NavLink href= "/checkin" className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Back</NavLink>
                    </div>
                </div>
            </form>
        </div>
    )
}