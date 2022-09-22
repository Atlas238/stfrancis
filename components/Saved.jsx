export default function Saved({ saved, setSaved }) {
    return (
        <>
            <input type="checkbox" id="savedModal" className="modal-toggle" value={saved} />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl">Saved Successfully!</h3>
                    <div className="modal-action">
                        <label for="savedModal" className="btn">Close</label>
                    </div>
                </div>
            </div>
        </>
    )
}