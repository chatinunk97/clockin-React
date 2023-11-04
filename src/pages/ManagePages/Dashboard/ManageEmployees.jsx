import { useState } from "react";
import { dashboardAxios } from "../../../config/axios";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import { useEffect } from "react";

export default function ManageEmployees() {
  const [loading, setLoading] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    setLoading(true);
    dashboardAxios
      .get("/user/getAllUser")
      .then((res) => {
        const userData = res.data.allUser.map((user) => ({
          PhotoImg: user.profileImage,
          FistName: user.firstName,
          LastName: user.lastName,
          Position: user.position,
          Supervisor: user.userBossId || "",
          EmployeeID: user.employeeId,
          PhoneNumber: user.mobile,
          Email: user.email,
          id: user.id,
        }));
        setAllUser(userData);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className=" flex flex-col justify-center w-full p-2">
      <div className="flex flex-col gap-4 w-full">
        <div className="grid grid-cols-3 items-baseline p-4">
          <div>
            <button className="w-32 p-2 bg-slate-200 rounded-2xl">
              Fliter
            </button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <h1>ICON</h1>
            <input
              type="text"
              className="w-[400px] p-2 rounded-2xl border bg-stone-100"
              placeholder="....."
            />
          </div>
          <div>
            <button
              className="w-32 p-2 bg-orange-500 rounded-2xl transition-transform hover:scale-105 hover:bg-orange-200 text-white font-bold"
              onClick={() => {
                setIsOpen(true);
              }}
            >
              Add User
            </button>
          </div>
        </div>
        <div>
          <TableEmployee allUser={allUser} loading={loading} />
          <Modal
            title="Add User "
            open={isOpen}
            onClose={() => setIsOpen(false)}
          >
            <AddmployeeForm allUser={allUser} />
          </Modal>
        </div>
      </div>
    </div>
  );
}
