import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLeaveList from "./DefaultLeaveList";
import SubmitButton from "../../../components/SubmitButton";
import useManage from "../../../hooks/use-manage";
import Loading from "../../../components/Loading";

export default function ManageLeaveSetting() {
  const { id } = useParams();
  const { getAllLeaveProfile, updateLeaveProfile } = useManage();
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState([]);
  const [editing, setEditing] = useState(false);

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

  // const handleSubmitForm = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const updatedLeaveProfile = {
  //       id: id,
  //       defaultDateAmount: input.defaultDateAmount,
  //     };
  //     console.log(updatedLeaveProfile);
  //     await updateLeaveProfile(updatedLeaveProfile);
  //     setEditing(editing ? true : false);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

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
              handleChangeInput(e, el.id);
            }}
            isDisabled={editing ? true : false}
          />
        ))}
      </div>
      {/* <div>
        <SubmitButton
          className={`${
            editing
              ? "bg-green-600 hover:bg-green-400"
              : "bg-orange-600 hover:bg-orange-400"
          } rounded-xl w-20 m-3 hover:bg-green-400`}
          onClick={handleSubmitForm}
        >
          {editing ? "Edit" : "Save"}
        </SubmitButton>
        <SubmitButton className="rounded-xl w-20 bg-[#2463EB] hover:bg-blue-400">
          Add
        </SubmitButton>
      </div> */}
    </div>
  );
}
