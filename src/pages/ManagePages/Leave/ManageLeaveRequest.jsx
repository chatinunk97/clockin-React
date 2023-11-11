import { useEffect } from "react";
import TableLeaveRequest from "./TableLeaveRequest";
import useLeave from "../../../hooks/use-leave";

export default function ManageLeaveRequest() {
  const { getAllRequestLeaves } = useLeave();

  useEffect(() => {
    getAllRequestLeaves()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" flex flex-col justify-start md:mt-20 md:w-full p-2 min-w-[414px] max-h-[896px]">
      <div className=" flex flex-col justify-start md:mt-20 w-full p-2 min-w-[414px] min-h-[896px]">
        <TableLeaveRequest />
      </div>
    </div>
  );
}
