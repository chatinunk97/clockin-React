import React from "react";

export default function LeaveCard({ startDate, endDate, messageLeave }) {
  return (
    <div className="p-3 shadow-lg w-80 md:w-full mt-8 rounded-lg ">
      <h1 className="text-lg font-bold text-green-600">LeaveDetail</h1>
      <p >Start Date : {startDate}</p>
      <p>End Date : {endDate}</p>
      <p>Leave Information : {messageLeave}</p>
    </div>
  );
}
