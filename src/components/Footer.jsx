import { useLocation } from "react-router-dom";
import MenuItem from "./MenuItem";
import {
  BsPersonFill,
  BsFillAlarmFill,
  BsFillPeopleFill,
  BsCalendarEvent,
  BsClockFill,
} from "react-icons/bs";
import MenuItems from "./MenuItems";


const menus = [
  { id: 1, to: "/profile", Icon: BsPersonFill, text: 'Profile' },
  { id: 2, to: "/clockin", Icon: BsFillAlarmFill, text: 'Clockin' },
  { id: 3, to: "/profile/people", Icon: BsFillPeopleFill, text: 'people' },
  { id: 4, to: "/profile/leave", Icon: BsCalendarEvent, text: 'Leave' },
  { id: 5, to: "/profile/ot", Icon: BsClockFill, text: 'OT' },
];


export default function Footer() {

  const { pathname } = useLocation()
  return (
    <div className="w-full">
      <nav className="flex justify-center items-center gap-2">
        {menus.map((items) => (
          <MenuItems
            key={items.id}
            to={items.to}
            Icon={items.Icon}
            active={pathname === items.to}
            text={items.text}
          />
        ))}
      </nav>
    </div>
  );
}
