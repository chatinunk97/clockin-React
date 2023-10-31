
import { Link } from "react-router-dom";

export default function MenuItem(to, Icon, active) {
    return (
        <div className="flex w-full justify-evenly p-2 items-center">
            {/* <Link to={to}> */}
            <div className="flex flex-col justify-center items-center  rounded-full p-2 w-16 h-16 gap-1 bg-slate-300  hover:text-green-700">
                <div className="text-2xl text-white hover:text-green-400">
                    <Icon
                        className={`${active ? "fill-blue-600" : "fill-gray-500"} `}
                    />
                </div>

            </div>
            {/* </Link> */}

        </div>
    );
}
