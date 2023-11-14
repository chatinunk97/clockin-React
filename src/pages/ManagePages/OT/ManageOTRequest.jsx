import { useEffect } from "react";
import useOT from "../../../hooks/use-OT";
import TableOTRequest from "./TableOTRequest";

export default function ManageOTRequest() {
  const { getAllRequestOT } = useOT();

  useEffect(() => {
    getAllRequestOT()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" w-full m-auto">
      <div className="text-2xl font-bold px-5">OT Request</div>
      <TableOTRequest />
    </div>
  );
}
