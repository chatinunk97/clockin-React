// import { useState } from "react";
// import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
// import AddmployeeForm from "../Edit/AddEmployeeForm";
import { useEffect } from "react";
import useUser from "../../../hooks/use-user";


export default function ManageEmployees() {
  const { getalluser, allUser, loading } = useUser();

  useEffect(() => {
    getalluser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col justify-start md:mt-20 p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full">
      <div className="flex justify-center items-center gap-4 md:w-full">
        <div className="flex justify-center items-center p-6">

        </div>
      </div>
      <div>
        <TableEmployee allUser={allUser} loading={loading} />
        {/* <Modal title="Add User " open={isOpen} onClose={() => setIsOpen(false)}>
          <AddmployeeForm allUser={allUser} onClose={() => setIsOpen(false)} />
        </Modal> */}
      </div>
    </div>
  );
}
