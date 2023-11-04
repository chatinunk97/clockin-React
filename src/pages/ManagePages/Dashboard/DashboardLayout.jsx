import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { BsPersonFill, BsCalendarEvent, BsFillMoonFill } from "react-icons/bs";
import { AiFillHome } from "react-icons/ai";
import DashboardMenuItems from "../../../components/DashboardMenuItems";
import { SlLogout } from "react-icons/sl";
import useManage from "../../../hooks/use-manage";
import MenuHamburger from "./MeneHamburger";

const DashboardMenu = [
  { id: 1, to: "/manage/dashboard", Icon: AiFillHome, text: "Dashboard" },
  { id: 2, to: "/manage/employees", Icon: BsPersonFill, text: "Employees" },
  {
    id: 3,
    to: "/manage/leave-request",
    Icon: BsCalendarEvent,
    text: "Leave Request",
  },
  { id: 4, to: "/manage/ot-Request", Icon: BsFillMoonFill, text: "OT Request" },
];

export default function DashboardLayout() {
  const { logout } = useManage();
  const { pathname } = useLocation();

  const [showMenu, setShowMenu] = useState(false);

  // เพิ่มฟังก์ชันตรวจสอบขนาดหน้าจอ
  const checkWindowSize = () => {
    if (window.innerWidth < 768) {
      setShowMenu(true);
    } else {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkWindowSize();
    };

    window.addEventListener("resize", handleResize);


    checkWindowSize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className=" bg-blue-950 h-16  w-full sticky top-0 md:w-60 md:h-screen flex md:flex-col gap-2 rounded-sm flex-shrink-0">
      {showMenu ? <MenuHamburger /> : null}
      {showMenu ? null : (
        <div className=" flex justify-center items-center">
          <div className="flex flex-col justify-center items-center pt-4 pb-4 gap-6 w-full">
            <div className="bg-white rounded-full w-40 h-40">
              <img src="https://img.freepik.com/premium-vector/clock-location-icon-realtime-geotag-icon-traffic-jam-symbol-travel-time-symbol-vector-illustration_756957-2275.jpg?w=740" className="w-full h-full object-contain rounded-full" />
            </div>
            <h1 className="text-2xl text-white font-bold">Clock IN</h1>
          </div>
        </div>
      )}
      {showMenu ? null : (
        <div>
          <hr />
          <nav>
            <div className="flex md:flex-col gap-2 p-2">
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
          <div className="absolute bottom-5 left-5 w-32 p-2 transition-transform hover:scale-105 rounded-xl hover:bg-slate-100 text-red-600 font-semibold">
            <div className="flex justify-center items-center gap-2">
              <SlLogout />
              <button onClick={logout}>Log Out</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
