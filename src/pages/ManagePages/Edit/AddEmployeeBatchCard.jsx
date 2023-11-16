import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FcApproval } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import Swal from "sweetalert2";

export default function AddEmployeeBatchCard({
  data,
  loading,
  isAdding,
  result,
  error,
}) {
  const showError = (input) => {
    Swal.fire({
      position: "center",
      icon: "error",
      html: input,
      timer : 3000,
      showConfirmButton: true,
    });
  };
  return (
    <div className="bg-white p-5 rounded-md flex items-center gap-5">
      <div className="flex-grow">{data.employeeId}</div>
      <div className="flex-grow">{data.firstName}</div>
      <div className="flex-grow">{data.position}</div>
      <div className="flex-grow">{data.email}</div>
      {result == "OK" ? (
        <FcApproval className="text-2xl" />
      ) : result == "NG" ? (
        <FcCancel
          className="cursor-pointer text-2xl"
          onClick={() => {
            showError(error);
          }}
        />
      ) : (
        ""
      )}
      {loading && isAdding ? (
        <AiOutlineLoading3Quarters className="animate-spin" />
      ) : (
        ""
      )}
    </div>
  );
}
