import { useState, useEffect, useRef } from 'react';
import { AiFillHome } from "react-icons/ai";
import { BsPersonFill, BsCalendarEvent, BsFillMoonFill } from 'react-icons/bs';
import { SlLogout } from 'react-icons/sl';
import MenuIcon from '@mui/icons-material/Menu';
import { useLocation } from 'react-router-dom';
import MenuHamburgerList from './MenuitemhamburgerList';
import useManage from "../../../hooks/use-manage";

export default function MenuHamburger() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { pathname } = useLocation();
    const DashboardMenu = [
        { id: 1, to: '/manage/dashboard', Icon: AiFillHome, text: 'Dashboard' },
        { id: 2, to: '/manage/employees', Icon: BsPersonFill, text: 'Employees' },
        {
            id: 3,
            to: '/manage/leave-request',
            Icon: BsCalendarEvent,
            text: 'Leave Request',
        },
        { id: 4, to: '/manage/ot-Request', Icon: BsFillMoonFill, text: 'OT Request' },
    ];
    const { logout } = useManage();
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="z-40 min-w-[414px] h-12 " ref={dropdownRef}>
            <div className="cursor-pointer text-slate-300 mt-4 ml-6 w-10" onClick={() => setIsOpen(!isOpen)}>
                <MenuIcon />
            </div>
            {isOpen && (
                <div>
                    <nav>
                        <div className="flex flex-col gap-2 p-2 bg-slate-100 translate-y-2 rounded-xl shadow-xl w-36 ml-4 ">
                            {DashboardMenu.map((items) => (
                                <MenuHamburgerList
                                    key={items.id}
                                    to={items.to}
                                    Icon={items.Icon}
                                    active={pathname === items.to}
                                    text={items.text}
                                />
                            ))}
                            <div className=" p-2 transition-transform hover:scale-105 rounded-xl hover:bg-slate-100 text-red-600 font-semibold">
                                <div className="flex justify-center items-center gap-2">
                                    <SlLogout />
                                    <button onClick={logout}>Log Out</button>
                                </div>
                            </div>
                        </div>
                    </nav>

                </div>
            )}
        </div>
    );
}
