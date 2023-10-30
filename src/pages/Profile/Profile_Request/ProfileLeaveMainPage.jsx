import { Link, Outlet } from "react-router-dom";

export default function ProfileLeaveMainPage() {
  return (
    <div>
      <div className="flex justify-evenly items-center p-6 text-2xl font-semibold text-green-600 md:justify-center md:gap-20 ">
        <Link to="/profile/leave">
          <div>
            <button className="hover:text-green-400 shadow-xl rounded-full p-4 w-40">
              Leave Form
            </button>
          </div>
        </Link>
        <Link to="/profile/myleave">
          <div>
            <button className="hover:text-green-400 shadow-xl rounded-full p-4 w-40">
              My Leave
            </button>
          </div>
        </Link>
      </div>
      <Outlet />
    </div>
  );
}
