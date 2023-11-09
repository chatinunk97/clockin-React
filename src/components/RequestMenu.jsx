import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function RequestMenu({ to, name, link }) {
  const matchPath = useLocation().pathname.split("/leave/")[1] === link;
  return (
    <Link
      to={to}
      className={`h-full justify-center items-center flex  ${
        matchPath ? "border-b-2 border-primaryGreen" : ""
      }`}
    >
      <button className="hover:text-green-500 w-40 border-none">{name}</button>
    </Link>
  );
}
