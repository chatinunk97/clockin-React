import { Link } from "react-router-dom";

export default function MenuHamburgerList({ to, Icon, active, text }) {
    return (
        <Link to={to}>
            <div className="shadow-lg rounded-xl hover:bg-blue-500 transform transition-transform hover:scale-105 pl-4 pr">
                <div className="flex justify-start text-center items-center gap-1 ">
                    <div className="flex justify-start items-center  p-1 w-16 h-16  ">
                        <div className="text-sm">
                            <Icon
                                className={`${active ? "fill-blue-500" : "fill-slate-400"} `}
                            />
                        </div>
                    </div>
                    <h1 className="text-sm text-black p-2">{text}</h1>
                </div>
            </div>
        </Link>
    );
}