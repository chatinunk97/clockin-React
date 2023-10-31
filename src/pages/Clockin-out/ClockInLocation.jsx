import { IoLocationSharp } from "react-icons/io5";

export default function ClockInlocation() {
    return (
        <div>
            <div className="flex w-[360px] mt-2 md:w-[800px] justify-center items-center">
                <div className="flex justify-between w-[360px] md:w-[800px] p-2">
                    <div className="flex gap-2 justify-center items-center hover:text-blue-500">
                        <button className="text-3xl text-green-600 hover:text-blue-500"><IoLocationSharp /></button>
                        <h1>Location</h1>
                    </div>
                    <h1>BKK</h1>
                </div>
            </div>

        </div>
    )
}
