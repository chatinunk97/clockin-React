import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
    BsPersonFill,
    BsCalendarEvent,
    BsFillMoonFill
} from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import DashboardMenuItems from "../../../components/DashboardMenuItems";




const DashboardMenu = [
    { id: 1, to: "/manage/dashboard", Icon: AiFillHome, text: 'Dashboard' },
    { id: 2, to: "/manage/employees", Icon: BsPersonFill, text: 'Employees' },
    { id: 3, to: "/manage/leave-request", Icon: BsCalendarEvent, text: 'Leave Request' },
    { id: 4, to: "/manage/ot-Request", Icon: BsFillMoonFill, text: 'OT Request' },
];




export default function DashboardLayout() {

    const { pathname } = useLocation()

    return (
        <div className=" bg-blue-950 w-60 h-screen max-h-screen flex flex-col gap-2 justify-start rounded-sm">
            <div className=" flex justify-center items-center">
                <div className="flex flex-col justify-center items-center pt-4 pb-4 gap-6 w-full">
                    <img src="https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU" className="w-40 h-40 rounded-full" />
                    <h1 className="text-2xl text-white font-bold">Clock IN</h1>
                </div>
            </div>
            <hr />
            <nav>
                <div className="flex flex-col">
                    {DashboardMenu.map((items) => (
                        <DashboardMenuItems
                            key={items.id}
                            to={items.to}
                            Icon={items.Icon}
                            active={pathname === items.to}
                            text={items.text}
                        />
                    ))}
                </div>
            </nav>
        </div>
    );
}

