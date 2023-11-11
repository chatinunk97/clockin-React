import React from "react";
import AggridTable from "../../components/AggridTable";

export default function CompanyList({ data }) {
  const columnDefs = [
    { field: "id", flex: 1 },
    { field: "companyName", flex: 1 },
    { field: "isActive", flex: 1 },
    { field: "package", flex: 1 },
    { field: "status", flex: 1 },
  ];
  console.log(data);
  return (
    <div className="p-5 px-10">
      <p>Compnay List</p>
      <AggridTable data={data} columnDefs={columnDefs} />
    </div>
  );
}
