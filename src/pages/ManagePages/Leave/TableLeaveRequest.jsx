import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useState, useMemo, useRef, useCallback } from "react";
import LinearIndeterminate from "../../../components/LoadingBar";
import SmallButton from "../../../components/SmallButton";
import { Link } from "react-router-dom";
import useLeave from "../../../hooks/use-leave";

export default function TableLeaveRequest() {
  const { allRequestLeaves, loading } = useLeave();
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
      filter: true,
    },
  };

  const sortingOrder = useMemo(() => {
    return ["desc", "asc", null, []];
  }, []);

  const gridApi = useRef(null);
  const onGridReady = useCallback((params) => {
    if (params.api) {
      gridApi.current = params.api;
      params.api.setRowData(allRequestLeaves);
    }
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterText = document.getElementById("filter-text-box").value;
    gridApi.current.setQuickFilter(filterText);
  }, []);

  return (
    <>
      <div className="ag-theme-alpine" style={{ height: 700, width: "auto" }}>
        {loading && <LinearIndeterminate />}
        <input
          type="text"
          id="filter-text-box"
          placeholder="Quick search..."
          onInput={onFilterTextBoxChanged}
          className="border border-stone-200 p-2 rounded-lg mb-4 w-60 "
        />
        <AgGridReact
          rowData={allRequestLeaves}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          sortingOrder={sortingOrder}
          onGridReady={onGridReady}
        ></AgGridReact>
      </div>
    </>
  );
}
