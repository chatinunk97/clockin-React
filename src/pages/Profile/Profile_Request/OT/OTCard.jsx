
export default function OTCard() {
    return (
        <div className="w-full h-36 border border-black rounded-2xl flex shadow-lg">
            <div className="flex h-full items-center p-2 justify-start gap-6 w-full">
                <div>
                    ICON
                </div>
                <div>
                    <div className="flex flex-col gap-2">
                        <h1>10/11/2023</h1>
                        <h1>18:00 - 22:00</h1>
                        <h1>OT Request</h1>
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col justify-end">
                <h1>PEDDING</h1>
            </div>
        </div>
    )
}
