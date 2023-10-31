import { Link } from "react-router-dom";

export default function RequestMenu({ to, name }) {
  return (
    <Link to={to}>
      <div>
        <button className="hover:text-green-400 shadow-xl rounded-full p-4 w-40">
          {name}
        </button>
      </div>
    </Link>
  );
}
