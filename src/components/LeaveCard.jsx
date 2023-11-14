import React from "react";

export default function LeaveCard({ startDate, endDate, messageLeave }) {
  return (
    <div className="p-3 shadow-md">
      LeaveCard
      <p>{startDate}</p>
      <p>{endDate}</p>
      <p>{messageLeave}</p>
    </div>
  );
}
