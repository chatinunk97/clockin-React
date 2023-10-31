import { useLocation } from "react-router-dom";
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
    <div className="fixed bottom-0 flex flex-col justify-evenly items-center w-full py-5 bg-blue-100 ">
      <nav className="flex   gap-2 bg-red-500 ">
        <div className="flex bg-fuchsia-500 justify-evenly w-[400px]">
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
