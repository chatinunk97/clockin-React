import { Link } from "react-router-dom";

export default function DashboardMenuItems({ to, Icon, active, text }) {
    return (
        <Link to={to}>
            <div className={`shadow-lg ${active ? "bg-blue-200" : 'hover:bg-blue-500'} rounded-xl  transform transition-transform hover:scale-105`}>
                <div className="flex justify-start text-center items-center gap-4 ">
                    <div className="flex justify-center items-center  p-2 w-16 h-16 gap-1 ">
                        <div className="text-2xl">
                            <Icon
                                className={`${active ? "fill-blue-800" : "fill-white"} `}
                            />
                        </div>
                    </div>
                    <h1 className={`text-xl ${active ? 'text-black font-semibold' : 'text-white'}`}>{text}</h1>
                </div>
            </div>
        </Link>
    );
}