export default function Printout({ formData, client }) {

    if (client === undefined && formData === undefined) return null

    if (client === undefined) return null
    
    return (
        <div className="">
            {/* Client Portion */}
            <div className="flex flex-col">
                <h1>{client?.firstName} {client?.lastName} HELLO</h1>
                <div className="divider horizontal"></div>
            </div>
            {/* Form Portion */}
            <div>
                {/* Clothing  */}
                <div className="flex flex-col">
                    <h2 className="text-xl">Clothing</h2>
                    <div className="flex">
                        <div>
                            <label className="p-4">Mens</label>
                            <div className="border border-solid border-black w-10 h-10"></div>
                        </div>
                        <div>
                            <label>Womens</label>
                            <div className="border border-solid border-black w-10 h-10"></div>
                        </div>
                        <div>
                            <label>Kids (Boy)</label>
                            <div className="border border-solid border-black w-10 h-10"></div>
                        </div>
                        <div>
                            <label>Kids (Girl)</label>
                            <div className="border border-solid border-black w-10 h-10"></div>
                        </div>
                    </div>
                </div>
                {/* Special Requests */}
                <div className='flex flex-col'>
                    <h2 className='text-xl'>Special Requests</h2>
                    <div className='flex'>
                    <div>
                        <label>Backpack</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                    <div>
                        <label>Sleeping Bag</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                    <div>
                        <label>Bus Ticket</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                    <div>
                        <label>Gift Card</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                    <div>
                        <label>Diaper</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                    <div>
                        <label>Financial Assistance</label>
                        <div className="border border-black border-solid w-10 h-10"></div>
                    </div>
                </div>
                </div>
                {/* Notes */}
                <div>
                    <h2 className="text-xl">Notes</h2>
                    <p>{formData?.notes}</p>
                </div>
            </div>
        </div>
    )
}