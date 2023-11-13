import { useMemo } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import LinearIndeterminate from "./LoadingBar";
import { AgGridReact } from "ag-grid-react";
import Modal from "./Modal";

export default function ManageTable({
  columns,
  allData,
  loading,
  editForm,
  isOpen,
  setIsOpen,
}) {
  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
  };

  const sortingOrder = useMemo(() => ["desc", "asc", null], []);

  const gridApi = useRef(null);

  const onGridReady = useCallback((params) => {
    if (params.api) {
      gridApi.current = params.api;
      params.api.setRowData(allData);
    }
  }, []);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterText = document.getElementById("filter-text-box").value;
    gridApi.current.setQuickFilter(filterText);
  }, []);

  return (
    <div className="overflow-y-auto">
      <div
        className="ag-theme-alpine"
        style={{ height: "calc(90vh - 200px)", width: "auto" }}
      >
        {loading && <LinearIndeterminate />}

        <input
          type="text"
          id="filter-text-box"
          placeholder="Quick search..."
          onInput={onFilterTextBoxChanged}
          className="border border-stone-200 p-2 rounded-lg mb-4 w-60 "
        />

        <AgGridReact
          rowData={allData}
          gridOptions={gridOptions}
          columnDefs={columns}
          sortingOrder={sortingOrder}
          onGridReady={onGridReady}
        />
        <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
          {editForm}
        </Modal>
      </div>
    </div>
  );
}
