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
    <div className="flex flex-col justify-start md:mt-20 p-2 max-w-[800px] max-h-[896px] md:w-full md:max-w-full">
      <div className="flex justify-center items-center gap-4 w-full">
        <div className="flex justify-center items-center p-6"></div>
      </div>
      <div className="w-full p-5">
        <TableEmployee allUser={allUser} loading={loading} />{" "}
      </div>
    </div>
  );
}
