import { useLocation } from "react-router-dom";
import {
  BsPersonFill,
  BsFillAlarmFill,
  BsFillPeopleFill,
  BsCalendarEvent,
  BsClockFill,
} from "react-icons/bs";
import MenuItems from "./MenuItems";
import useAuth from "../hooks/use-auth";

export default function Footer() {
  const { authUser } = useAuth();

  const menus = [
    {
      id: 1,
      to: `/profile/${authUser?.id}`,
      Icon: BsPersonFill,
      text: "Profile",
    },
    { id: 2, to: "/clockin", Icon: BsFillAlarmFill, text: "Clockin" },
    { id: 3, to: "/profile/people", Icon: BsFillPeopleFill, text: "People" },
    { id: 4, to: "/leave/leaveform", Icon: BsCalendarEvent, text: "Leave" },
    { id: 5, to: "/ot/otform", Icon: BsClockFill, text: "OT" },
  ];

  const { pathname } = useLocation();
  return (
    <div className="bottom-0 flex fixed flex-col items-center w-full py-2 bg-blue-100 mt-0">
      <nav className="flex gap-2 ">
        <div className=" grid grid-cols-5 md:w-full ">
          {menus.map((items) => (
            <MenuItems
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
