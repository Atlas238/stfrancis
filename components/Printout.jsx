export default function Printout({ formData, client }) {

    if (client === undefined && formData === undefined) return null

    if (client === undefined) return null
    
    return (
        <div className="z-50 m-auto print">
            {/* Client Portion */}
            <div className="flex justify-center border-b-black border-b-2">
                <h1 className="text-2xl font-bold pt-5 pl-5 pr-24">{client?.firstName} {client?.lastName}'s Shopping List</h1>
                <h1 className="text-2xl font-bold pt-5">{new Date(Date.now()).toDateString()}</h1>
            </div>
            {/* Form Portion */}
            <div>
                {/* Clothing  */}
                <div className="flex flex-col">
                    <h2 className="text-xl font-semibold pl-10">Clothing</h2>
                    <div className="flex pl-10 text-sm">
                        <div className="p-2">
                            <label className="p-4">Mens</label>
                            <div className="border border-solid border-black w-10 h-10 p-4 ml-4"></div>
                        </div>
                        <div className="p-2">
                            <label className="p-4">Womens</label>
                            <div className="border border-solid border-black w-10 h-10 p-4 ml-6"></div>
                        </div>
                        <div className="p-2">
                            <label className="p-4">Kids (Boy)</label>
                            <div className="border border-solid border-black w-10 h-10 p-4 ml-6"></div>
                        </div>
                        <div className="p-2">
                            <label className="p-4">Kids (Girl)</label>
                            <div className="border border-solid border-black w-10 h-10 p-4 ml-6"></div>
                        </div>
                    </div>
                </div>
                {/* Special Requests */}
                <div className='flex flex-col mt-5'>
                    <h2 className='text-xl pl-10 font-semibold'>Special Requests</h2>
                    <div className='flex pl-10 text-sm'>
                    <div className="p-2">
                        <label className="p-3">Backpack</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-5"></div>
                    </div>
                    <div className="p-2">
                        <label className="p-3">Sleeping Bag</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-7"></div>
                    </div>
                    <div className="p-2">
                        <label className="p-3">Bus Ticket</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-5"></div>
                    </div>
                    <div className="p-2">
                        <label className="p-3">Gift Card</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-5"></div>
                    </div>
                    <div className="p-2">
                        <label className="p-3">Diaper</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-5"></div>
                    </div>
                    <div className="p-2">
                        <label>Financial Assistance</label>
                        <div className="border border-black border-solid w-10 h-10 p-4 ml-5"></div>
                    </div>
                </div>
                </div>
                <div className="divider"></div>
                {/* Notes */}
                <div className="pl-10">
                    <h2 className="text-xl font-semibold">Notes</h2>
                    <p className="text-sm p-4">{formData?.notes}</p>
                </div>
            </div>
        </div>
    )
}