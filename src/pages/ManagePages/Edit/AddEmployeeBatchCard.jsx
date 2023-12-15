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
      timer: 3000,
      showConfirmButton: true,
    });
  };
  return (
    <div className="bg-white p-5 rounded-md flex items-center gap-5 shadow-md">
      <div className="flex-grow w-[5%] flex justify-center">
        {data.employeeId}
      </div>
      <div className="flex-grow w-[10%] flex justify-center">
        {data.firstName}
      </div>
      <div className="flex-grow w-[10%] flex justify-center">
        {data.userType}
      </div>
      <div className="flex-grow w-[10%] flex justify-center">
        {data.position}
      </div>
      <div className="flex-grow w-[10%] flex justify-center overflow-hidden whitespace-nowrap text-overflow-ellipsis">
  {data.email}
</div>

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
