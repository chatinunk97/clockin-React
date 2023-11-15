import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/EditEmployeeFrom";
import LinearIndeterminate from "../../../components/LoadingBar";
import { Link } from "react-router-dom";
import SmallButton from "../../../components/SmallButton";
import "../../../../src/styles.css";
import CustomizedButtons from "../../../components/ButtonCustomization";
import AddmployeeForm from "../Edit/AddEmployeeForm";
import ExcelJS from "exceljs";

export default function TableEmployee({ allUser, loading }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenadd, setIsOpenadd] = useState(false);
  const [UserbyId, setUserById] = useState({});

  const [columnDefs] = useState([
    { field: "firstName", width: 180, filter: true },
    { field: "lastName", width: 180, filter: true },
    { field: "position", width: 180, filter: true },
    { field: "userBossId", width: 180, filter: true },
    { field: "employeeId", width: 180, filter: true },
    { field: "mobile", width: 180, filter: true },
    { field: "email", width: 180, filter: true },
    { field: "isActive", width: 140, filter: true },
    {
      field: "actionButtons",
      width: 180,
      headerName: "",
      cellRenderer: (params) => (
        <div className="flex gap-2 justify-center items-center h-full">
          <div className="p-2">
            <SmallButton
              onClick={() => {
                setUserById(params.data);
                setIsOpen(true);
              }}
            />
          </div>
          <div>
            <Link to={`/manage/employee/${params.data.id}`}>
              <SmallButton
                onClick={() => {
                  setUserById(params.data);
                }}
                bg="bg-azure-600"
                hover="hover:bg-azure-400"
                buttonName="View"
              />
            </Link>
          </div>
        </div>
      ),
      minWidth: 180,
      resizable: true,
    },
  ]);

  const exportToExcel = () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Ag-Grid Data");

    const columnHeaders = columnDefs.map((column) => column.headerName);
    worksheet.addRow(columnHeaders);

    allUser.forEach((rowData) => {
      const row = [];
      columnDefs.forEach((column) => {
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

  const gridOptions = {
    defaultColDef: {
      resizable: true,
      sortable: true,
      filter: true,
    },
    domLayout: "autoHeight",
  };

  const sortingOrder = useMemo(() => ["desc", "asc", null], []);

  const gridApi = useRef(null);

  const onGridReady = useCallback(
    (params) => {
      if (params.api) {
        gridApi.current = params.api;
        params.api.setRowData(allUser);
      }
    },
    [allUser]
  );

  useEffect(() => {
    if (gridApi.current) {
      gridApi.current.sizeColumnsToFit({
        defaultMinWidth: 100,
        columnLimits: [{ key: "userBossId", minWidth: 180 }],
      });
    }
  }, [allUser]);

  const onFilterTextBoxChanged = useCallback(() => {
    const filterText = document.getElementById("filter-text-box").value;

    gridApi.current.setQuickFilter(filterText);
  }, []);

  return (
    <div className="overflow-y-auto">
      <div
        className="ag-theme-alpine"
        style={{ height: "auto", width: "auto" }}
      >
        {loading && <LinearIndeterminate />}
        <div className=" flex flex-col md:flex-row justify-center md:justify-start items-center mb-4 gap-6 md:ml-4">
          <input
            type="text"
            id="filter-text-box"
            placeholder="Quick search..."
            onInput={onFilterTextBoxChanged}
            className="border border-stone-200 p-4 rounded-lg md:w-96 w-36"
          />
          <button
            onClick={exportToExcel}
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-3 px-6 rounded-md shadow-md  hover:from-blue-700 hover:to-green-700"
          >
            Export to Excel
          </button>
          <div
            onClick={() => {
              setIsOpenadd(true);
            }}
            className="rounded-3xl w-32 p-1 md:"
          >
            <CustomizedButtons buttonName="Add User" />
          </div>
        </div>
        <AgGridReact
          rowData={allUser}
          gridOptions={gridOptions}
          columnDefs={columnDefs}
          sortingOrder={sortingOrder}
          onGridReady={onGridReady}
          suppressMenuHide={true}
        />
        <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
          <EditemployeeForm
            UserbyId={UserbyId}
            allUser={allUser}
            onClose={() => setIsOpen(false)}
          />
        </Modal>
        <Modal
          title="Add User "
          open={isOpenadd}
          onClose={() => setIsOpenadd(false)}
        >
          <AddmployeeForm
            allUser={allUser}
            onClose={() => setIsOpenadd(false)}
          />
        </Modal>
      </div>
    </div>
  );
}
