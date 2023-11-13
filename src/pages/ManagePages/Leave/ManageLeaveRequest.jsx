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
    <div className="w-full p-5 pt-10">
      <TableLeaveRequest />
    </div>
  );
}
