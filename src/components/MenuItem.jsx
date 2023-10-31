import {
    BsPersonFill,
    BsFillAlarmFill,
    BsFillPeopleFill,
    BsCalendarEvent,
    BsClockFill,
} from "react-icons/bs";
import { Link } from "react-router-dom";

export default function MenuItem() {
    return (
        <div className="flex w-full justify-evenly p-2 items-center">
            <Link to="/profile">
                <div className="flex flex-col justify-center items-center  rounded-full p-2 w-16 h-16 gap-1 bg-slate-300  hover:text-green-700">
                    <div className="text-2xl text-white hover:text-green-400">
                        <BsPersonFill />
                    </div>
                    <h1 className="text-sm">Profile</h1>
                </div>
            </Link>
            <Link to="/clockin">
                <div className="flex flex-col justify-center items-center  rounded-full p-2 w-18 h-18 gap-1 bg-slate-300  hover:text-green-700">
                    <div className="text-2xl text-white hover:text-green-400">
                        <BsFillAlarmFill />
                    </div>
                    <h1 className="text-sm">Clock In</h1>
                </div>
            </Link>
            <Link to="/profile/people">
                <div className="flex flex-col justify-center items-center  rounded-full p-2 w-16 h-16 gap-1 bg-slate-300  hover:text-green-700">
                    <div className="text-2xl text-white hover:text-green-400">
                        <BsFillPeopleFill />
                    </div>
                    <h1 className="text-sm">People</h1>
                </div>
            </Link>
            <Link to="/profile/leave">
                <div className="flex flex-col justify-center items-center  rounded-full p-2 w-16 h-16 gap-1 bg-slate-300  hover:text-green-700">
                    <div className="text-2xl text-white hover:text-green-400">
                        <BsCalendarEvent />
                    </div>
                    <h1 className="text-sm">Leave</h1>
                </div>
            </Link>
            <Link to="/profile/OT">
                <div className="flex flex-col justify-center items-center  rounded-full p-2 w-16 h-16 gap-1 bg-slate-300  hover:text-green-700">
                    <div className="text-2xl text-white hover:text-green-400">
                        <BsClockFill />
                    </div>
                    <h1 className="text-sm">OT</h1>
                </div>
            </Link>
        </div>
    );
}
