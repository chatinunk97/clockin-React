import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo } from "react";
import LinearIndeterminate from "../../../components/LoadingBar";

export default function TableLeaveRequest({ requestLeaves, loading }) {
  // console.log(requestLeaves);
  const [columnDefs] = useState([
    { field: "firstName", flex: 1 },
    { field: "lastName", flex: 1 },
    { field: "startDate", flex: 1 },
    { field: "endDate", flex: 1 },
    // { field: "halfDate", flex: 1 },
    { field: "statusRequest", flex: 1 },
    { field: "messageLeave", flex: 1 },
    {
      field: "actionButtons",
      headerName: "",
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center items-center h-full">
          <div className="p-2">
            <button
              onClick={(e) => {
                console.log(params.data);
              }}
              className="font-bold text-white w-14 h-6 bg-blue-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-blue-400"
            >
              View
            </button>
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
