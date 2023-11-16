import { useMemo } from "react";
import { useRef } from "react";
import { useCallback } from "react";
import LinearIndeterminate from "./LoadingBar";
import { AgGridReact } from "ag-grid-react";
import Modal from "./Modal";
import ExcelJS from "exceljs";
import { useEffect } from "react";

export default function ManageTable({
  columns,
  allData,
  loading,
  editForm,
  isOpen,
  setIsOpen,
  height = "300px",
}) {
  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    domLayout: "autoHeight",
  };

  const sortingOrder = useMemo(() => ["desc", "asc", null, []], []);

  const gridApi = useRef(null);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ag-Grid Data");

    const columnHeaders = columns.map((column) => column.headerName);
    worksheet.addRow(columnHeaders);

    allData.forEach((rowData) => {
      const row = [];
      columns.forEach((column) => {
        row.push(rowData[column.field]);
      });
      worksheet.addRow(row);
    });

    workbook.xlsx.writeBuffer().then((data) => {
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ag-grid-data.xlsx";
      a.click();
      window.URL.revokeObjectURL(url);
    });
  };

  const onGridReady = useCallback(
    (params) => {
      if (params.api) {
        gridApi.current = params.api;
        params.api.setRowData(allData);
      }
    },
    [allData]
  );

  useEffect(() => {
    if (gridApi.current) {
      gridApi.current.sizeColumnsToFit({
        defaultMinWidth: 100,
        columnLimits: [{ key: "firstName", minWidth: 180 }],
      });
    }
  }, [allData]);


  const onFilterTextBoxChanged = useCallback(() => {
    const filterText = document.getElementById("filter-text-box").value;
    gridApi.current.setQuickFilter(filterText);
  }, []);

  return (
    <div className="shadow-xl rounded-lg border p-5 overflow-auto">
      <div className="overflow-y-auto">
        <div
          className="ag-theme-alpine"
          style={{ height: height, width: "auto" }}
        >
          {loading && <LinearIndeterminate />}
          <div className="flex gap-4 items-center mb-4">
            <input
              type="text"
              id="filter-text-box"
              placeholder="Quick search..."
              onInput={onFilterTextBoxChanged}
              className="border border-stone-200 p-2 rounded-lg w-60 "
            />
            <button
              onClick={exportToExcel}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-md shadow-md  hover:from-blue-700 hover:to-green-700"
            >
              Export to Excel
            </button>
          </div>
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
    </div>
  );
}
