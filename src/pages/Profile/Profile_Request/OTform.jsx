import { AiFillCalendar } from "react-icons/ai";
import { LuClock7 } from "react-icons/lu";
import { BsFillClipboard2Fill } from "react-icons/bs";
export default function OTform() {
    return (
        <div className="flex flex-col justify-center items-start p-4 mt-12 gap-4 md:items-center md:p-20 md:mt-0">
            <h1 className=" text-3xl font-bold">Information</h1>
            <div>
                <div className="flex items-center gap-6 w-[300px]">
                    <button className="text-3xl text-slate-700"><AiFillCalendar /></button>
                    <div className="text-xl border-b border-b-neutral-400 w-[300px] text-center cursor-none">Calendar Date</div>
                </div>
                <div className="flex gap-4 pt-6 pb-6 text-xl justify-between">
                    <div className="flex gap-4 items-center">
                        <button className="className= text-slate-600 text-2xl"><LuClock7 /></button>
                        <div className="border-b border-b-neutral-400  text-center">17:00</div>
                    </div>
                    <div className="flex gap-4 items-center">
                        <button className="className= text-slate-600 text-2xl"><LuClock7 /></button>
                        <div className="border-b border-b-neutral-400  text-center">20:00</div>
                    </div>
                </div>
                <div className="flex items-center gap-4 pt-6">
                    <div className="text-3xl text-slate-700"><BsFillClipboard2Fill /></div>
                    <input type="text" placeholder="Request OT" className="border-b border-b-neutral-400  text-start p-4 focus:ring focus:ring-green-300  focus:border-green-500 outline-none" />
                </div>
            </div>
            <hr className="w-full border-stone-300" />
            <div className="p-4 w-full md:w-[400px]">
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Date</div>
                    <div>30/10/2023</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Time</div>
                    <div>17:00-20:00</div>
                </div>
                <div className="flex justify-between">
                    <div className="text-xl font-semibold">Total</div>
                    <div>2 HR</div>
                </div>
            </div>
            <div className="flex justify-center items-center bg-green-600 w-full p-4 rounded-full hover:bg-green-400 md:w-[600px]">
                <button className="text-xl text-white">Submit</button>
            </div>
        </div>
    )
}
