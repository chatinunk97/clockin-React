import { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Modal from "../../../components/Modal";
import EditemployeeForm from "../Edit/EditEmployeeFrom";
import { useMemo } from "react";
import LinearIndeterminate from "../../../components/LoadingBar";
import { Link } from "react-router-dom"

export default function TableEmployee({ allUser, loading }) {
    const [isOpen, setIsOpen] = useState(false);
    const [UserbyId, setUserById] = useState({});
    const [columnDefs] = useState([
        { field: "firstName", flex: 1 },
        { field: "lastName", flex: 1 },
        { field: "position", flex: 1 },
        { field: "userBossId", flex: 1 },
        { field: "employeeId", flex: 1 },
        { field: "mobile", flex: 1 },
        { field: "email", flex: 1 },
        { field: "isActive", flex: 1 },
        {
            field: "actionButtons",
            headerName: "",
            cellRenderer: (params) => (
                <div className="flex gap-2 justify-center items-center h-full">
                    <div className="p-2">
                        <button
                            onClick={() => {
                                console.log(params.data)
                                // setUserById(params.data);
                                // setIsOpen(true);
                            }}
                            className="font-bold text-white w-14 h-6 bg-green-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-green-400"
                        >
                            Edit
                        </button>
                    </div>

                    <div>
                        <Link to={`/manage/employee/${params.data.id}`}>
                            <button
                                onClick={() => {
                                    setUserById(params.data);
                                }}
                                className="font-bold text-white w-14 h-6 bg-blue-600 rounded-xl flex justify-center items-center p-2 text-center transition-transform hover:scale-105 hover:bg-blue-400"
                            >
                                View
                            </button>
                        </Link>
                    </div>

                </div >
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
        <div className="ag-theme-alpine" style={{ height: 700, width: "auto" }}>
            {loading && <LinearIndeterminate />}
            <AgGridReact rowData={allUser} gridOptions={gridOptions} columnDefs={columnDefs} sortingOrder={sortingOrder}></AgGridReact>
            <Modal title="Edit" open={isOpen} onClose={() => setIsOpen(false)}>
                <EditemployeeForm UserbyId={UserbyId} allUser={allUser} onClose={() => setIsOpen(false)} />
            </Modal>
        </div>
    );
}
