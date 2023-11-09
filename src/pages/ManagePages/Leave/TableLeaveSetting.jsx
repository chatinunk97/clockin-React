import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { useMemo } from "react";
import Modal from "../../../components/Modal";
import EditLeaveSettingForm from "./EditLeaveSettingForm";
import LinearIndeterminate from "../../../components/LoadingBar";

export default function TableLeaveSetting({
  leaveProfiles,
  leaveProfileById,
  setLeaveProfileById,
  loading,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [columnDefs] = useState([
    { field: "leaveName", flex: 1 },
    { field: "defaultDateAmount", flex: 1 },
    {
      field: "actionButtons",
      headerName: "",
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center items-center h-full">
          <div className="p-2">
            <button
              onClick={(e) => {
                setLeaveProfileById(params.data);
                setIsOpen(true);
              }}
              className="font-bold text-white w-14 h-6 bg-green-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-green-400"
            >
              Edit
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
          rowData={leaveProfiles}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          sortingOrder={sortingOrder}
        ></AgGridReact>
        <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
          <EditLeaveSettingForm
            leaveProfileById={leaveProfileById}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
      </div>
    </>
  );
}
