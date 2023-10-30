import { Link } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import PeopleList from "../../../components/Profile/PeopleList";
import InputBar from "../../../components/InputBar";

export default function PeoplePage() {
  return (
    <div>
      <div className="flex justify-center relative">
        <AiOutlineSearch className="absolute bottom-[12px] left-[38px] text-lg" />

        <InputBar
          type="text"
          placeholder="Search for contact"
          className="placeholder:italic placeholder:text-slate-400 block bg-inputGray border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primaryGreen focus:ring-1 w-full mx-6 mt-3"
        />
      </div>

      <Link to="/profile/">
        <PeopleList image="https://cdn.pixabay.com/photo/2018/01/27/07/24/nature-3110567_1280.jpg" />
      </Link>
      <PeopleList image="https://cdn.pixabay.com/photo/2018/01/27/07/24/nature-3110567_1280.jpg" />
      <PeopleList image="https://cdn.pixabay.com/photo/2018/01/27/07/24/nature-3110567_1280.jpg" />
    </div>
  );
}
