import { useState, useMemo, useCallback, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/EditEmployeeFrom";
import LinearIndeterminate from "../../../components/LoadingBar";
import { Link } from "react-router-dom";
import SmallButton from "../../../components/SmallButton";
import "../../../../src/styles.css";

export default function TableEmployee({ allUser, loading }) {
    const [isOpen, setIsOpen] = useState(false);
    const [UserbyId, setUserById] = useState({});
    const [columnDefs] = useState([
        { field: "firstName", width: 180, filter: true },
        { field: "lastName", width: 180, filter: true },
        { field: "position", width: 180, filter: true },
        { field: "userBossId", width: 180, filter: true },
        { field: "employeeId", width: 180, filter: true },
        { field: "mobile", width: 180, filter: true },
        { field: "email", width: 180, filter: true },
        { field: "isActive", width: 160, filter: true },
        {
            field: "actionButtons",
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
        },
    ]);

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
            params.api.setRowData(allUser);
        }
    }, []);


    const onFilterTextBoxChanged = useCallback(() => {
        const filterText = document.getElementById("filter-text-box").value;
        gridApi.current.setQuickFilter(filterText);
    }, []);

    return (
        <div className="overflow-y-auto">
            <div className="ag-theme-alpine" style={{ height: "calc(90vh - 200px)", width: "auto" }}>
                {loading && <LinearIndeterminate />}

                <input
                    type="text"
                    id="filter-text-box"
                    placeholder="Quick search..."
                    onInput={onFilterTextBoxChanged}
                    className="border border-stone-200 p-2 rounded-lg mb-4 w-60 "
                />

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
            </div>
        </div>
    );
}
