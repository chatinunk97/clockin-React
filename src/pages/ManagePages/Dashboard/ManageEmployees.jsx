import * as React from "react";
import TableEmployee from "./TableEmployee";
import { useEffect } from "react";
import useUser from "../../../hooks/use-user"

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

  return (
    <div className="flex flex-col justify-start md:mt-[36px] p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full overflow-y-auto">
      <div className="w-full p-5 flex flex-col gap-2">
        <div className="text-2xl font-bold">Employees</div>
        <TableEmployee allUser={allUser} loading={loading} />{" "}
      </div>
    </div>
  );
}
