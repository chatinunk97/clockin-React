import { useLocation } from "react-router-dom";
import {
  BsPersonFill,
  BsFillAlarmFill,
  BsFillPeopleFill,
  BsCalendarEvent,
  BsClockFill,
} from "react-icons/bs";
import MenuItem from "./MenuItem";

const menus = [
  { id: 1, to: "/profile", icon: <BsPersonFill />, name: "Profile" },
  { id: 2, to: "/clockin", icon: <BsFillAlarmFill />, name: "Clock In" },
  { id: 3, to: "/profile/people", icon: <BsFillPeopleFill />, name: "People" },
  { id: 4, to: "/profile/leave", icon: <BsCalendarEvent />, name: "Leave" },
  { id: 5, to: "/profile/ot", icon: <BsClockFill />, name: "OT" },
];

export default function Footer() {
  const { pathname } = useLocation();

  return (
    <div className="fixed bottom-0 flex justify-evenly items-center w-full py-5 bg-blue-100 ">
      {menus.map((el) => (
        <MenuItem
          key={el.id}
          to={el.to}
          icon={el.icon}
          name={el.name}
          active={pathname === el.to}
        />
      ))}
    </div>
  );
}
