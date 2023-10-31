import { Link } from "react-router-dom";

export default function MenuItems({ to, Icon, active, text }) {
    return (
        <Link to={to}>
            <div className="px-10 py-2 rounded-lg hover:bg-gray-200 text-center items-center w-full">
                <div className="flex justify-center items-center text-center flex-col">
                    <div className="text-2xl text-white hover:text-green-400">
                        <Icon
                            className={`${active ? "fill-green-600" : "fill-gray-500"} `}
                        />
                    </div>
                    <h1 className="text-sm">{text}</h1>
                </div>
            </div>
        </Link>
    );
}