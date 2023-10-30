import { Link } from "react-router-dom";
import OTform from "./OTform";
import { Outlet } from "react-router-dom";

export default function ProfileOTMainPage() {
    return (
        <div>
            <div className="flex justify-evenly items-center p-6 text-2xl font-semibold text-green-600 md:justify-center md:gap-20 ">
                <Link to='/profile/ot'>
                    <div>
                        <button className="hover:text-green-400 shadow-xl rounded-full p-4 w-40">OT Form</button>
                    </div>
                </Link>
                <Link to="/profile/myot">
                    <div>
                        <button className="hover:text-green-400 shadow-xl rounded-full p-4 w-40">My OT</button>
                    </div>
                </Link>
            </div>
            <div>
                <Outlet />
                {/* <OTform /> */}
            </div>
        </div>
    )
}
