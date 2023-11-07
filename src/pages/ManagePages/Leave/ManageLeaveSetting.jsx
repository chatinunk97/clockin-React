import { useState, useEffect } from "react";
import DefaultLeaveList from "./DefaultLeaveList";
import SubmitButton from "../../../components/SubmitButton";
import useManage from "../../../hooks/use-manage";
import Loading from "../../../components/Loading";

export default function ManageLeaveSetting() {
  const { getAllLeaveProfile } = useManage();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState([]);

  useEffect(() => {
    setLoading(true);
    getAllLeaveProfile()
      .then((res) => {
        setInput(res.data.allLeaveProfile);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleChangeInput = (e, id) => {
    const updatedInput = input.map((el) => {
      if (el.id === id) {
        return { ...el, defaultDateAmount: e.target.value };
      }
      return el;
    });

    setInput(updatedInput);
  };

  return (
    <div className="w-full flex flex-col m-auto items-center gap-3 p-10 mx-72 bg-gray-200 rounded-lg">
      <h1 className="text-lg font-bold">Default Leaves</h1>
      <div className="flex flex-col gap-3">
        {loading && <Loading />}
        {input.map((el) => (
          <DefaultLeaveList
            key={el.id}
            leaveObj={el}
            value={el.defaultDateAmount}
            onChange={(e) => {
              console.log(el.id);
              console.log(e.target);
              handleChangeInput(e, el.id);
            }}
          />
        ))}
      </div>
      <div>
        <SubmitButton className="rounded-xl w-20 m-3 hover:bg-green-400">
          Edit
        </SubmitButton>
        <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
          Add
        </SubmitButton>
      </div>
    </div>
  );
}
