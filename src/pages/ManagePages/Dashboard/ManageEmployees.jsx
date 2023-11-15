import * as React from "react";
import Modal from "../../../components/Modal";
import TableEmployee from "./TableEmployee";
import { useEffect, useState } from "react";
import useUser from "../../../hooks/use-user";

import AddEmployeeBatch from "../Edit/AddEmployeeBatch";

export default function ManageEmployees() {
  const { getalluser, allUser, loading } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    getalluser()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBatchImportClick = () => {
    setIsOpen(true);
  };

  return (
    <div className="flex flex-col justify-start md:mt-20 p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="flex justify-center items-center p-6"></div>
      </div>
      <div className="w-full p-5">
        <TableEmployee allUser={allUser} loading={loading} />
        <Modal title="Add User" open={isOpen} onClose={() => setIsOpen(false)}>
          <AddEmployeeBatch />
        </Modal>
      </div>
      <button
        className="p-4 px-2 bg-red-500 rounded-md"
        onClick={handleBatchImportClick}
      >
        Test batch import
      </button>
    </div>
  );
}
