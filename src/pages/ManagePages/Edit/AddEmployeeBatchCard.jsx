import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function AddEmployeeBatchCard({ data }) {
  return (
    <div className="bg-white p-5 rounded-md flex items-center gap-5">
      <div>{data.employeeId}</div>
      <div>{data.firstName}</div>
      <div>{data.position}</div>
      <div>{data.email}</div>
      <AiOutlineLoading3Quarters className="animate-spin"/>
    </div>
  );
}
