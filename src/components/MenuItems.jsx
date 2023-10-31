import { Link } from "react-router-dom";

export default function MenuItems({ to, Icon, active, text }) {
    return (
        <Link to={to}>
            <div className="px-10 py-2 rounded-lg text-center items-center w-full">
                <div className="flex justify-center items-center text-center flex-col ">
                    <div className="flex flex-col justify-center items-center bg-slate-300 rounded-full p-2 w-16 h-16 gap-1 ">
                        <div className="text-2xl text-white">
                            <Icon
                                className={`${active ? "fill-green-600" : "fill-gray-500"} `}
                            />
                        </div>
                    </div>
                    <h1 className="text-sm">{text}</h1>
                </div>
            </div>
        </Link>
    );
}