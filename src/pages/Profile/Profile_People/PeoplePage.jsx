import { AiOutlineSearch } from "react-icons/ai";
import PeopleList from "./PeopleList";
import InputBar from "../../../components/InputBar";
import { useState } from "react";
import { clockAxios } from "../../../config/axios";
import { useEffect } from "react";

export default function PeoplePage() {
  const [allPeople, setAllPeople] = useState([]);

  useEffect(() => {
    clockAxios
      .get("/user/getAllUser")
      .then((res) => {
        setAllPeople(res.data.allUser);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center sticky top-0 bg-white">
        <AiOutlineSearch className="absolute bottom-[12px] left-[38px] text-lg" />
        <InputBar
          type="text"
          placeholder="Search for contact"
          className="placeholder:italic placeholder:text-slate-400 block bg-inputGray border border-slate-300 rounded-md py-2 pl-9 pr-3 shadow-sm focus:outline-none focus:border-primaryGreen focus:ring-1 w-full mx-6 mt-3"
        />
      </div>
      <PeopleList allPeople={allPeople} />
    </div>
  );
}
