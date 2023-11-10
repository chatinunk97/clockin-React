import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo } from "react";
import LinearIndeterminate from "../../../components/LoadingBar";
import SmallButton from "../../../components/SmallButton";
import { Link } from "react-router-dom";

export default function TableLeaveRequest({ requestLeaves, loading }) {
  const [columnDefs] = useState([
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "leaveName", flex: 1 },
    { field: "startDate", flex: 1 },
    { field: "endDate", flex: 1 },
    { field: "statusRequest", flex: 1 },
    { field: "messageLeave", flex: 1 },
    {
      field: "actionButtons",
      headerName: "",
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center items-center h-full">
          <div className="p-2">
            <Link to={`/manage/leave-request/${params.data.id}`}>
              <SmallButton
                onClick={() => {
                  console.log(params.data);
                }}
                bg="bg-blue-600"
                hover="hover:bg-blue-400"
                buttonName="View"
              />
            </Link>
          </div>
        </div>
      ),
    },
  ]);

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
    },
  };

  const sortingOrder = useMemo(() => {
    return ["desc", "asc", null];
  }, []);

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 700, width: "auto" }}>
        {loading && <LinearIndeterminate />}
        <AgGridReact
          rowData={requestLeaves}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          sortingOrder={sortingOrder}
        ></AgGridReact>
      </div>
    </>
  );
}
